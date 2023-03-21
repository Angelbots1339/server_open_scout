import express from "express";
import got from "got";
import Competition2023 from "../models/Competition2023.model";
import competition2023Model from "../models/Competition2023.model";

const router = express.Router();
const getFromTBA = async (url: string): Promise<any> => {
    return got("https://www.thebluealliance.com/api/v3/" + url, {
        headers: {
            "X-TBA-Auth-Key": process.env.TBA_KEY
        }
    }).json();
}
const countCycle = (input: string, eq: string) => {
    return {
        $size: {
            $filter: {
                input: "$cycles",
                as: "cycle",
                cond: {
                    $eq: [
                        "$$cycle." + input,
                        eq
                    ]
                }
            }
        }
    }
}
const countSubstation = (input: string, eq: string) => {
    return {
        $size: {
            $filter: {
                input: "$cycles",
                as: "cycle",
                cond: {
                    $or: [
                        {
                            $eq: [
                                "$$cycle.pickup",
                                "substation"
                            ]
                        },
                        {
                            $eq: [
                                "$$cycle.pickup",
                                "single"
                            ]
                        },
                        {
                            $eq: [
                                "$$cycle.pickup",
                                "double"
                            ]
                        }
                        ]
                }
            }
        }
    }
}
const countAuto = (eq: string) => {
    return {
        $size: {
            $filter: {
                input: "$auto.path",
                as: "cycle",
                cond: {
                    "$eq": [
                        "$$cycle.height",
                        eq
                    ]
                }
            }
        }
    }
}

const reduceAutoPath = {
    $concat: [
        {
            $reduce: {
                input: "$auto.path",
                initialValue: "",
                in: {
                    $concat: ["$$value", {
                        $cond:
                            {
                                if: {$eq: ["$$this.type", "pickup"]},
                                then: "pickup: ",
                                else: {$concat: ["$$this.type", " place ", "$$this.height", " ", {$toString: "$$this.id"}, ", "]}
                            }
                    }]
                }
            },

        },
        {
            $switch: {
                branches: [
                    {case: {$eq: ["$auto.chargingStation", "engaged"]}, then: "engaged on chargingStation"},
                    {case: {$eq: ["$auto.chargingStation", "docked"]}, then: "docked on chargingStation"}
                ],
                default: ""
            }
        }
    ]


}

const getAutoScore = {
    $add: [
        {$multiply: [countAuto("top"), 6]},
        {$multiply: [countAuto("mid"), 4]},
        {$multiply: [countAuto("hybrid"), 3]},
        {
            $switch: {
                branches: [
                    {case: {$eq: ["$auto.chargingStation", "engaged"]}, then: 8},
                    {case: {$eq: ["$auto.chargingStation", "docked"]}, then: 12}
                ],
                default: 0
            }
        },
        {
            $cond:
                {
                    if: "$auto.mobility",
                    then: 3,
                    else: 0
                }
        }
    ]
}
const countCycles = {
    $project: {
        match: "$match",
        totalCycles: {$size: "$cycles"},
        autoScore: getAutoScore,
        auto: reduceAutoPath,
        endGameScore: {
            $switch: {
                branches: [
                    {case: {$eq: ["$auto.chargingStation", "engaged"]}, then: 6},
                    {case: {$eq: ["$auto.chargingStation", "docked"]}, then: 10}
                ],
                default: 0
            }
        },
        topCount: countCycle("placement", "top"),
        midCount: countCycle("placement", "mid"),
        hybridCount: countCycle("placement", "hybrid"),
        failedCount: countCycle("placement", "fail"),
        groundPickupCount: countCycle("pickup", "ground"),
        tippedPickupCount: countCycle("pickup", "tipped"),
        singleSubstationPickupCount: countCycle("pickup", "single"),
        doubleSubstationPickupCount: countCycle("pickup", "double"),
        substationPickupCount: countSubstation,
        totalCone: countCycle("type", "cone"),
        totalCube: countCycle("type", "cube"),
        scoutName: "$scoutName",
    }
}


const getContributedScore = {
    $addFields: {
        teleopScore: {
            $add: [
                {$multiply: ["$topCount", 5]},
                {$multiply: ["$midCount", 3]},
                {$multiply: ["$hybridCount", 2]},
            ]
        },
        contributedScore: {
            $add: [
                {$multiply: ["$topCount", 5]},
                {$multiply: ["$midCount", 3]},
                {$multiply: ["$hybridCount", 2]},
                "$autoScore",
                "$endGameScore"
            ]
        }
    }
}
const convertArray = (array: Object) => {
    return {
        $reduce: {
            input: array,
            initialValue: "",
            in: {$concat: ["$$value", {$toString: "$$this"}, ", "]}
        }
    }
}
const divideZeroProtection = (num1: Object, num2: Object) => {
    return {
        $round: [
            {
                $cond:
                    {
                        if: {$eq: [num2, 0]},
                        then: 0,
                        else: {$divide: [num1, num2]}
                    }
            },
            2
        ]
    }

}
const groupTeams = {
    $group: {
        _id: "$_id",
        matchCount: {$sum: 1},
        totalCycles: {$sum: "$totalCycles"},
        avgCycles: {$avg: "$totalCycles"},
        avgContributedScore: {$avg: "$contributedScore"},
        contributedScores: {$push: "$contributedScore"},
        avgAutoContributedScore: {$avg: "$autoScore"},
        autoContributedScores: {$push: "$autoScore"},
        avgTeleopContributedScore: {$avg: "$teleopScore"},
        teleopContributedScores: {$push: "$teleopScore"},
        avgEndGameContributedScore: {$avg: "$endGameScore"},
        endGameContributedScores: {$push: "$endGameScore"},
        totalConeCycles: {$sum: "$totalCone"},
        totalCubeCycles: {$sum: "$totalCube"},
        totalHighCycles: {$sum: "$topCount"},
        totalMidCycles: {$sum: "$midCount"},
        totalHybridCycles: {$sum: "$hybridCount"},
        totalFailedCycles: {$sum: "$failedCount"},
        totalSubstationPickupCount: {$sum: "$substationPickupCount"},
        totalSingleSubstationPickupCount: {$sum: "$singleSubstationPickupCount"},
        totalDoubleSubstationPickupCount: {$sum: "$doubleSubstationPickupCount"},
        totalGroundPickupCount: {$sum: "$groundPickupCount"},
        totalTipped: {$sum: "$tippedPickupCount"}
    }
}
const addArrays = {
    $project: {
        avgContributedScore: "$avgContributedScore",
        avgAutoContributedScore: "$avgAutoContributedScore",
        avgTeleopContributedScore: "$avgTeleopContributedScore",
        avgEndGameContributedScore: "$avgEndGameContributedScore",
        contributedScores: convertArray("$contributedScores"),
        autoContributedScores: convertArray("$autoContributedScores"),
        teleopContributedScores: convertArray("$teleopContributedScores"),
        endGameContributedScores: convertArray("$endGameContributedScores"),
        avgTotalCycles: "$avgCycles",
        matchCount: "$matchCount",
        percentHigh: divideZeroProtection("$totalHighCycles", "$totalCycles"),
        percentMid: divideZeroProtection("$totalMidCycles", "$totalCycles"),
        percentHybrid: divideZeroProtection("$totalHybridCycles", "$totalCycles"),
        percentCone: divideZeroProtection("$totalConeCycles", "$totalCycles"),
        percentCube: divideZeroProtection("$totalCubeCycles", "$totalCycles"),
        percentOfPickupFromSingle: divideZeroProtection("$totalSingleSubstationPickupCount", "$totalCycles"),
        percentOfPickupFromDouble: divideZeroProtection("$totalDoubleSubstationPickupCount", "$totalCycles"),
        percentOfPickedFromBothSub: divideZeroProtection("$totalSubstationPickupCount", "$totalCycles"),
        percentOfPickedGround: divideZeroProtection("$totalGroundPickupCount", "$totalCycles"),
        percentOfConesPickedTipped: divideZeroProtection("$totalTipped", "$totalConeCycles"),
        percentFailed: divideZeroProtection("$totalFailedCycles", "$totalCycles")
    }
}


const getAllMatchesTeam = (comp: string, team: string) => {
    return [
        {
            $match: {
                _id: comp
            }
        },
        {
            $unwind: "$matchScout"
        },
        {
            $unwind: "$matchScout.teams"
        },
        {
            $addFields: {
                "matchScout.teams.match": "$matchScout._id"
            }
        },
        {
            $replaceRoot: {
                newRoot: "$matchScout.teams"
            }
        },
        {
            $match: {
                $and: [{
                    _id: {
                        $regex: team
                    }
                }, {auto: {$exists: true}}]
            }
        },
        countCycles,
        getContributedScore,
    ]
}
const getAllMatches = (comp: string) => {
    return [
        {
            $match: {
                _id: comp
            }
        },
        {
            $unwind: "$matchScout"
        },
        {
            $unwind: "$matchScout.teams"
        },
        {
            $addFields: {
                "matchScout.teams.match": "$matchScout._id"
            }
        },
        {
            $replaceRoot: {
                newRoot: "$matchScout.teams"
            }
        },
        {
            $match: {auto: {$exists: true}}
        },
        countCycles,
        getContributedScore,
        {
            $addFields: {
                uid: {
                    $toInt: {
                        $last: { $split: ["$match", "m"] }
                    }
                }
            }
        },
        {$sort: {"uid": 1, "_id": 1}},
        {$unset: "uid"},
    ]
}
const getAllPracticeMatches = (comp: string) => {
    return [{
        $match: {
            $and: [{_id: comp}, {practiceMatches: {$exists: true}}]
        }
    },
        {
            $unwind: "$practiceMatches"
        },
        {
            $replaceRoot: {
                newRoot: "$practiceMatches"
            }
        },
        countCycles,
        getContributedScore
    ]

}
const getAllPracticeMatchSummary = (comp: string) => {
    return [{
        $match: {
            $and: [{_id: comp}, {practiceMatches: {$exists: true}}]
        }
    },
        {
            $unwind: "$practiceMatches"
        },
        {
            $replaceRoot: {
                newRoot: "$practiceMatches"
            }
        },
        countCycles,
        getContributedScore,
        groupTeams,
        addArrays
    ]

}


const getTeamAutos = (comp: string, team: string) => {
    return [
        {
            $match: {
                _id: comp
            }
        },
        {
            $unwind: "$matchScout"
        },
        {
            $unwind: "$matchScout.teams"
        },
        {
            $replaceRoot: {
                newRoot: "$matchScout.teams"
            }
        },
        {
            $match: {
                $and: [{
                    _id: {
                        $regex: team
                    }
                }, {auto: {$exists: true}}]
            }
        },
        {
            $project: {
                match: "$match",
                autoScore: getAutoScore,
                autoPath: "$auto.path",
                chargingStation: "$auto.chargingStation",
                mobility: "$auto.mobility",
                preload: "$auto.preload"
            }
        }
    ]
}
const getSummary = (comp: string) => {
    return [
        {
            $match: {
                _id: comp
            }
        },
        {
            $unwind: "$matchScout"
        },
        {
            $unwind: "$matchScout.teams"
        },
        {
            $replaceRoot: {
                newRoot: "$matchScout.teams"
            }
        },
        {
            $match: {
                auto: {$exists: true}
            }
        },
        countCycles,
        getContributedScore,
        groupTeams,
        addArrays
    ]
}


router.route("/events").get(async (req, res, next) => {
    Competition2023.find().then((data) => {
        res.send(data)
    }).catch(next);
});
router.route("/event/:event").get((req, res, next) => {
        Promise.all([Competition2023.findById(req.params.event), getFromTBA("event/" + req.params.event)]).then(([event, tbaEvent]) => {
            // @ts-ignore
            res.send({...event?.toObject(), ...tbaEvent});
        }).catch(next)
    }
);
router.route("/event/:event/matches/simple").get((req, res, next) => {
    getFromTBA("event/" + req.params.event + "/matches/simple").then((matches) => {
        res.send(matches);
    }).catch(next)
})
router.route("/event/:event/matches/keys").get((req, res, next) => {
    getFromTBA("event/" + req.params.event + "/matches/keys").then((matches) => {
        res.send(matches);
    }).catch(next)
})
router.route("/event/:event/matches/flat").get((req, res, next) => {
    Promise.all([competition2023Model.aggregate(getSummary(req.params.event)), getFromTBA("/event/" + req.params.event + "/teams"), getFromTBA("/event/" + req.params.event + "/oprs")]).then(([matches, tbaTeams, tbaOPR]) => {
        let final = matches.map((match) => {
            let nickname = tbaTeams.find((team: any) => {
                // console.log(team.nickname);
                return team.key === match._id;
            });

            if (nickname != undefined) {
                nickname = nickname.nickname;
            }
            return {
                ...match,
                "nickname": nickname,
                "opr": tbaOPR.oprs[match._id]
            }
        })
        res.send(final);
    }).catch(next);
})

router.route("/event/:event/practiceMatches/flat").get((req, res, next) => {
    Promise.all([competition2023Model.aggregate(getAllPracticeMatchSummary(req.params.event)), getFromTBA("/event/" + req.params.event + "/teams")]).then(([matches, tbaTeams]) => {
        let final = matches.map((match) => {
            let nickname = tbaTeams.find((team: any) => {
                // console.log(team.nickname);
                return team.key === match._id;
            });

            if (nickname != undefined) {
                nickname = nickname.nickname;
            }

            console.log(nickname);
            return {
                ...match,
                "nickname": nickname
            }
        })
        res.send(final);
    }).catch(next);
})

router.route("/event/:event/matches").get((req, res, next) => {
    // @ts-ignore
    Promise.all([competition2023Model.aggregate(getAllMatches(req.params.event)), getFromTBA("/event/" + req.params.event + "/teams")]).then(([matches, tbaTeams]) => {
        let final = matches.map((match) => {
            let nickname = tbaTeams.find((team: any) => {
                // console.log(team.nickname);
                return team.key === match._id;
            });

            if (nickname != undefined) {
                nickname = nickname.nickname;
            }

            return {
                ...match,
                "nickname": nickname
            }
        })
        res.send(final);
    }).catch(next);
})
router.route("/event/:event/practiceMatches").get((req, res, next) => {
    Promise.all([competition2023Model.aggregate(getAllPracticeMatches(req.params.event)), getFromTBA("/event/" + req.params.event + "/teams")]).then(([matches, tbaTeams]) => {
        let final = matches.map((match) => {
            let nickname = tbaTeams.find((team: any) => {
                // console.log(team.nickname);
                return team.key === match._id;
            });

            if (nickname != undefined) {
                nickname = nickname.nickname;
            }

            return {
                ...match,
                "nickname": nickname
            }
        })
        res.send(final);
    }).catch(next);
})


router.route("/event/:event/setMatches").patch((req, res, next) => {
    getFromTBA("event/" + req.params.event + "/matches").then((event) => {

        const mapped = event.map((event: any) => ({
            _id: `${event.comp_level}${event.match_number}`
            ,
            teams: event.alliances.blue.team_keys.concat(event.alliances.red.team_keys).map((team: string) => ({
                _id: team,
                match: `${event.comp_level}${event.match_number}`
            }))
        }));

        Competition2023.updateOne({_id: req.params.event}, {matchScout: mapped}, {new: true}).then(() => {
            res.send("Updated")
        }).catch(next)
    }).catch(next)
});


/* POSTs*/
router.route("/event").post((req, res, next) => {
    console.log(req.body);
    Competition2023.create(req.body)
        .then((event) => {
            res.send(event)
        })
        .catch(next)
});

router.route("/event/:event/tbaTeams").get((req, res, next) => {
        Promise.all([getFromTBA("event/" + req.params['event'] + "/teams")]).then(([tbaEventTeams]) => {
            // @ts-ignore
            res.send({...tbaEventTeams});
        }).catch(next);
    }
);
router.route("/event/:event/team/:team/matches").get((req, res, next) => {
        // @ts-ignore
    Competition2023.aggregate(getAllMatchesTeam(req.params.event, req.params.team)).then(
            (matches) =>
                res.send(matches)
        ).catch(next)
    }
)
router.route("/event/:event/team/:team/autos").get((req, res, next) => {
        Competition2023.aggregate(getTeamAutos(req.params.event, req.params.team)).then(
            (autos) =>
                res.send(autos)
        ).catch(next)
    }
)


router.route("/event/:event/match/:match/team").post(async (req, res, next) => {
    Competition2023.updateOne(
        {_id: req.params.event},
        {
            $set: {
                "matchScout.$[match].teams.$[team]": req.body
            }
        }, {
            arrayFilters: [{
                "match._id": req.params.match
            }, {
                "team._id": req.body._id
            }]
        }).then((event) => {
        res.send(event)
    }).catch(next)
});
router.route("/event/:event/practiceMatch").post(async (req, res, next) => {
    Competition2023.updateOne(
        {_id: req.params.event},
        {
            $push: {
                "practiceMatches": req.body
            }
        }).then((event) => {
        res.send(event)
    }).catch(next)
});


router.route("/event/:event/match/:match/team/:team").get(async (req, res, next) => {
    Competition2023.findOne(
        {_id: req.params.event},
        {
            $get: "matchScout.$[match].teams.$[team]"
        }, {
            arrayFilters: [{
                "match._id": req.params.match
            }, {
                "team._id": req.params.team
            }]
        }).then((event) => {
        res.send(event)
        console.log(event);
    }).catch(next)
});


export default router;