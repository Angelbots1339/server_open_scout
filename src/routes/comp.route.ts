import express from "express";
import got from "got";
import Competition2023 from "../models/Competition2023.model";
import {Query} from "mongoose";

const router = express.Router();


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

router.route("/event/:event/teams").get((req, res, next) => {
        Promise.all([getFromTBA("event/" + req.params['event'] + "/teams")]).then(([tbaEventTeams]) => {
            // @ts-ignore
            res.send({...tbaEventTeams});
        }).catch(next);
    }
);
router.route("/event/:event/team/:team/matches").get((req, res, next) => {
        getAllMatches(req.params.team).then((matches) => {
            res.send(matches);
        }).catch(next)
    }
)
router.route("/event/:event/team/:team/autos").get((req, res, next) => {
        Competition2023.aggregate(getTeamAutos(req.params.team)).then(
            (autos) =>
                res.send(autos)
        ).catch(next)
    }
)


router.route("/event/:event/match/:match/team").post(async (req, res, next) => {
    const result = await Competition2023.updateOne(
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
    const result = await Competition2023.updateOne(
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
    const result = await Competition2023.findOne(
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
    $addFields: {
        match: "$match",
        totalCycles: {$size: "$cycles"},
        autoScore: getAutoScore,
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
        groundPickupCount: countCycle("pickup", "ground"),
        tippedPickupCount: countCycle("pickup", "tipped"),
        substationPickupCount: countCycle("pickup", "substation"),
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
        contributedScore:{
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


const getTeam = (team: string) => {
    return [
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
        countCycles,
        getContributedScore
    ]
}

const getTeamAutos = (team: string) => {
    return [
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
const getAllMatches = async (team: string): Promise<any> => {
    return Competition2023.aggregate(getTeam(team));
}
const getMatchesFromEachTeam = async (): Promise<any> => {
    return Competition2023.aggregate([]
    );
}


export default router;