import express from "express";
import got from "got";
import Competition2023 from "../models/Competition2023.model";

const router = express.Router();



router.route("/events").get(async (req, res, next) => {
    Competition2023.find().then((data) => {res.send(data)}).catch(next);
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
    getFromTBA("event/" + req.params.event + "/matches/keys").then((event) => {
        event.map((key: any) => ({_id: key}))
        console.log(event)
        // Competition2023.updateOne({_id: req.params.event}, {matchScout: event}).then(() => {
        //     res.send("Updated")
        // }).catch(next)
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



router.route("/event/:event/match/:match/team/:team").post( async (req, res, next) => {
    const result = await Competition2023.updateOne(
        {_id: req.params.event, "matchScout._id": req.params.match, "matchScout.teams._id": req.params.team},
        {
            $set: {
                "matchScout.$.teams.$": req.body
            }
        }).then((event) => {
            console.log(event);
            console.log(event.matchedCount);
    }).catch(next)

});

const getFromTBA = async (url: string) : Promise<[Object]> => {
    return got("https://www.thebluealliance.com/api/v3/" + url, {
        headers: {
            "X-TBA-Auth-Key": process.env.TBA_KEY
        }
    }).json();
}


export default router;