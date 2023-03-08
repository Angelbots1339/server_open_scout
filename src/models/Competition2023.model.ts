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
    }
);
autoPath.virtual('score').get(() => {
    // @ts-ignore
    if(this.type !== "pickup") {
        // @ts-ignore
        switch (this.height) {
            case "top":
                return 6;
            case "mid":
                return 4;
            case "hybrid":
                return 3;
        }
    }
    return 0;
});
const autoScout = new Schema({
    startingPosition: fieldPos,
    mobility: Boolean,
    path: [autoPath],
    chargingStation: {
        type: String,
        enum: ["Parked", "Docked", "None"],
        default: "None"
    },
    onChargingStation: {
        type: Boolean
    }
});


autoScout.virtual('score').get(() => {
    let score = 0;
        // @ts-ignore
        if (this.mobility) {
            score += 3;
        }
        // @ts-ignore
        if (this.chargingStation === "Parked") {
            score += 8;
            // @ts-ignore
        } else if (this.chargingStation === "Docked") {
            score += 12;
        }
    // @ts-ignore
        score += this.path.reduce((acc : number, cur: any) => {acc + cur.score}, 0);

    return score;

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
    object: {
        type: String,
        enum: ["CONE", "CUBE"]
    },
    pickup: {
        type: String,
        enum: ["ground", "shelf", "tipped"]
    },
    placement: {
        type: String,
        enum: ["top", "mid", "hybrid", "fail"]
    }
});

cycleScout.virtual('score').get(() => {
    // @ts-ignore
    switch (this.placement) {
        case "top":
            return 5;
        case "mid":
            return 3;
        case "hybrid":
            return 2;
    }
    return 0;
});
const teamMatchScout = new mongoose.Schema({
    _id: {
        type: String
    },
    match: {
        type: String
    },
    auto: autoScout,
    cycles: [cycleScout],
    chargeStation: {
        type: Boolean,
    },
    chargingStation: {
        type: String,
        enum: ["Parked", "Docked", "None"],
        default: "None"
    }

});
teamMatchScout.virtual('score').get(() => {
    let score = 0;
    // @ts-ignore
    score += this.auto.score;
    // @ts-ignore
    score += this.cycles.reduce((acc : number, cur: any) => {acc + cur.score}, 0);
    // @ts-ignore
    if (this.chargingStation === "Parked") {
        score += 6;
        // @ts-ignore
    } else if (this.chargingStation === "Docked") {
        score += 10;
    }
    return score;

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
    matchScout: [matchScout],
    practiceMatches: [teamMatchScout]
});

const Competition2023 = mongoose.model("competition2023", competition2023Schema)

const autoScouts = autoScout.path("path");


// // @ts-ignore
// autoScouts.discriminator("PICK", pick)
// // @ts-ignore
// autoScouts.discriminator("PLACE", place)

export default Competition2023;