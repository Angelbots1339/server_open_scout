import express from "express";
import got from "got";
import Competition2023 from "../models/Competition2023.model";

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

router.route("/event/:event/updateMatches").patch((req, res, next) => {
    getFromTBA("event/" + req.params.event + "/matches").then((event) => {

        const mapped = event.map((event: any) => ({
            _id: `${event.comp_level}${event.match_number}`
            ,
            teams: event.alliances.blue.team_keys.concat(event.alliances.red.team_keys).map((team: string) => ({_id: team}))
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
        Promise.all([getFromTBA("event/" + req.params['event'] + "/teams")]).then(([ tbaEventTeams]) => {
            // @ts-ignore
            res.send({...tbaEventTeams});
        }).catch(next);

    }
);


router.route("/event/:event/match/:match/team").post(async (req, res, next) => {
    console.log(req.body._id)
    console.log(req.params.match)

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
        }).then((event) =>{
        res.send(event)
        console.log(event);
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
        }).then((event) =>{
        res.send(event)
        console.log(event);
    }).catch(next)
});

const getFromTBA = async (url: string): Promise<[Object]> => {
    return got("https://www.thebluealliance.com/api/v3/" + url, {
        headers: {
            "X-TBA-Auth-Key": process.env.TBA_KEY
        }
    }).json();
}


export default router;