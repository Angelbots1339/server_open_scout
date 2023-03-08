import mongoose, {Schema} from "mongoose";

const pitScout = new mongoose.Schema({
    _id: {
        type: String
    },
    flagged: Boolean,
    images: [String]
});
const fieldPos = new mongoose.Schema({
    x: Number,
    y: Number
});
const autoPath  = new mongoose.Schema({
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
    }
);
const autoScout = new Schema({
    startingPosition: fieldPos,
    mobility: Boolean,
    path: [autoPath],
    // chargingStation: {
    //     type: String,
    //     enum: ["PARKED", "DOCKED", "DEFAULT"],
    //     default: "DEFAULT"
    // },
    chargingStation: {
        type: String,
        enum: ["none", "docked", "engaged"]
    },
    preload: {
        type: String,
        enum: ["cube", "cone", "none"]
    },
});


// const place = new Schema({
//     placeHeight: {
//         type: String,
//         enum: ["HYBRID", "MIDDLE", "TOP"]
//     },
//     col: {
//         type: Number,
//         min: 0,
//         max: 8,
//     }
// })
//
// const pick = new Schema({
//     position: {
//         type: Number,
//         min: 0,
//         max: 5
//     }
// })


const cycleScout = new mongoose.Schema({
    type: {
        type: String,
        enum: ["cone", "cube"]
    },
    pickup: {
        type: String,
        enum: ["ground", "substation", "tipped"]
    },
    placement: {
        type: String,
        enum: ["top", "mid", "hybrid", "fail"]
    }
});
const teamMatchScout = new mongoose.Schema({
    _id: {
        type: String
    },
    auto: autoScout,
    cycles: [cycleScout],
    chargingStation: {
        type: String,
        enum: ["none", "docked", "engaged"]
    },

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

const autoScouts = autoScout.path("path");


// // @ts-ignore
// autoScouts.discriminator("PICK", pick)
// // @ts-ignore
// autoScouts.discriminator("PLACE", place)

export default Competition2023;