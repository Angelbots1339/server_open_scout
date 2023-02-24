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
// @ts-ignore
autoScout.path("path").discriminator("PICK", new Schema({
    position: {
        type: Number,
        min: 0,
        max: 5
    }
}));
//@ts-ignore
autoScout.path("path").discriminator("PLACE", new Schema({
    placeHeight: {
        type: String,
        enum: ["HYBRID", "MIDDLE", "TOP"]
    },
    col: {
        type: Number,
        min: 0,
        max: 8,
    }
}));

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

export default Competition2023;