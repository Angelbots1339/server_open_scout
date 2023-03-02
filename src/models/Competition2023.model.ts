import mongoose, {Schema} from "mongoose";

const pitScout = new mongoose.Schema({
    _id: {
        type: String
    },
    flagged: Boolean,
    images: [String]
});
const autoStartPos = new mongoose.Schema({
    x: Number,
    y: Number
});
const autoPath = new mongoose.Schema({
        type: {
            type: String,
            enum: ["cube", "cone", "pickup"]
        },
        id: Number,
        height: {
            type: String,
            enum: ["top", "mid", "hybrid", "fail"],
            required: false,
        }
    },
    {discriminatorKey: "action"}
);
const autoScout = new Schema({
    startingPosition: autoStartPos,
    mobility: Boolean,
    path: [autoPath],
    onChargingStation: {
        type: Boolean
    }
});
// // @ts-ignore
// autoScout.path("path").discriminator("PICK", new Schema({
//     position: {
//         type: Number,
//         min: 0,
//         max: 5
//     }
// }));
// //@ts-ignore
// autoScout.path("path").discriminator("PLACE", new Schema({
//     placeHeight: {
//         type: String,
//         enum: ["HYBRID", "MIDDLE", "TOP"]
//     },
//     col: {
//         type: Number,
//         min: 0,
//         max: 8,
//     }
// }));

const cycleScout = new mongoose.Schema({
    object: {
        type: String,
        enum: ["cone", "cube"]
    },
    pickup: {
        type: String,
        enum: ["ground", "shelf", "tipped"]
    },
    placement: {
        type: String,
        enum: ["top", "mid", "hybrid", "fail"]
    },
    // Time: Number,
});
const teamMatchScout = new mongoose.Schema({
    _id: {
        type: String
    },
    auto: autoScout,
    cycles: [cycleScout],
    chargeStation: {
        type: Boolean,
    }

});
const matchScout = new mongoose.Schema({
    _id: {
        type: String
    },
    teams: [teamMatchScout],
    accuracy: {
        type: Number
    }
})
const competition2023Schema = new mongoose.Schema({
    _id: {
        type: String
    },


    pitScout: [pitScout],
    matchScout: [matchScout]
});

const Competition2023 = mongoose.model("competition2023", competition2023Schema)

export default Competition2023;