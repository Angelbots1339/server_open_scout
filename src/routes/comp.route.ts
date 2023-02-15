import express from "express";
import got from "got";
import Competition2023 from "../models/Competition2023.model";

const router = express.Router();



router.route("/event/:event").get((req, res, next) => {
        Promise.all([Competition2023.findById(req.params.event), getFromTBA("event/" + req.params.event)]).then(([event, tbaEvent]) => {
            // @ts-ignore
            res.send({...event?.toObject(), ...tbaEvent});
        }).catch(next)
    }
);



/* POSTs*/
router.route("/event").post((req, res, next) => {
    console.log(req);
    Competition2023.create(req.body)
        .then((event) => {
            res.send(event)
        })
        .catch(next)
});

const getFromTBA = async (url: string) => {
    return got("https://www.thebluealliance.com/api/v3/" + url, {
        headers: {
            "X-TBA-Auth-Key": process.env.TBA_KEY
        }
    }).json();
}


export default router;