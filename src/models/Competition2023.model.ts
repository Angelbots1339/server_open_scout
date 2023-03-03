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
const autoPoint = new mongoose.Schema({
        object: {
            type: String,
            enum: ["CONE", "CUBE"]
        }
    }, {discriminatorKey: "action"}
);
const autoScout = new Schema({
    startingPosition: fieldPos,
    mobility: Boolean,
    path: [autoPoint],
    chargingStation: {
        type: String,
        enum: ["PARKED", "DOCKED", "DEFUALT"],
        default: "DEFAULT"
    }
});


const place = new Schema({
    placeHeight: {
        type: String,
        enum: ["HYBRID", "MIDDLE", "TOP"]
    },
    col: {
        type: Number,
        min: 0,
        max: 8,
    }
})

const pick = new Schema({
    position: {
        type: Number,
        min: 0,
        max: 5
    }
})


const cycleScout = new mongoose.Schema({
    object: {
        type: String,
        enum: ["CONE", "CUBE"]
    },
    pickupLocation: {
        type: String,
        enum: ["GROUND", "SINGLE_SUBSTATION", "DOUBLE_SUBSTATION_TRAY", "DOUBLE_SUBSTATION_CHUTE"]
    },
    placeHeight: {
        type: String,
        enum: ["HYBRID", "MIDDLE", "TOP"]
    },
    Time: Number,
});
const teamMatchScout = new mongoose.Schema({
    _id: {
        type: String
    },
    auto: autoScout,
    cycles: [cycleScout],
    endGame: {
        type: String,
        enum: ["PARKED", "DOCKED", "DEFUALT"],
        default: "DEFAULT"
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

const autoScouts = autoScout.path("path");
// @ts-ignore
autoScouts.discriminator("PICK", pick)
// @ts-ignore
autoScouts.discriminator("PLACE", place)

export default Competition2023;