import express from "express";
import got from "got";
import Competition2023 from "../models/Competition2023.model";
import competition2023Model from "../models/Competition2023.model";


let kcmtTeams: any = {
    "teams": {
        "0": {
            "address": null,
            "city": "Denver",
            "country": "USA",
            "gmaps_place_id": null,
            "gmaps_url": null,
            "key": "frc1339",
            "lat": null,
            "lng": null,
            "location_name": null,
            "motto": null,
            "name": "Chevron/REV Robotics/Denver Public Schools/ULA/The Wizard's Chest/Raytheon/EAFAF/Hallmoore Consulting/Plasticare/Blue Flame Powder Coating/Lockheed Martin & Family/Community",
            "nickname": "AngelBotics",
            "postal_code": "80206",
            "rookie_year": 2004,
            "school_name": "Family/Community",
            "state_prov": "Colorado",
            "team_number": 1339,
            "website": "https://www.angelbotics.com"
        },
        "1": {
            "address": null,
            "city": "Denver",
            "country": "USA",
            "gmaps_place_id": null,
            "gmaps_url": null,
            "key": "frc1410",
            "lat": null,
            "lng": null,
            "location_name": null,
            "motto": null,
            "name": "George Washington High School/Ball Corporation/Comcast NBC Universal/Lockheed Martin/S&P Global Foundation/Xcel Energy Foundation/Denver Public Schools/S&P Global Foundation/Tomorrow's Harvest/US Engineering/Rocky Mountain SCTE&George Washington High School&Young Engineers Association",
            "nickname": "The Kraken",
            "postal_code": "80224",
            "rookie_year": 2004,
            "school_name": "Young Engineers Association & George Washington High School",
            "state_prov": "Colorado",
            "team_number": 1410,
            "website": "http://www.frc1410.org"
        },
        "2": {
            "address": null,
            "city": "Longmont",
            "country": "USA",
            "gmaps_place_id": null,
            "gmaps_url": null,
            "key": "frc1619",
            "lat": null,
            "lng": null,
            "location_name": null,
            "motto": null,
            "name": "The GEAR Alliance&The GEAR Alliance",
            "nickname": "Up-A-Creek Robotics",
            "postal_code": "80501",
            "rookie_year": 2005,
            "school_name": "The GEAR Alliance",
            "state_prov": "Colorado",
            "team_number": 1619,
            "website": "http://www.team1619.org"
        },
        "3": {
            "address": null,
            "city": "Littleton",
            "country": "USA",
            "gmaps_place_id": null,
            "gmaps_url": null,
            "key": "frc1799",
            "lat": null,
            "lng": null,
            "location_name": null,
            "motto": null,
            "name": "DL Engineering, Inc/Comcast NBCUniversal/IEEE - Denver/Lockheed-Martin Corporation/Wild Ideas Light Company&Dakota Ridge Senior High Sch",
            "nickname": "Wired-Up!",
            "postal_code": "80127",
            "rookie_year": 2006,
            "school_name": "Dakota Ridge Senior High Sch",
            "state_prov": "Colorado",
            "team_number": 1799,
            "website": "https://sites.google.com/a/jeffcoschools.us/cagray/home/frc"
        },
        "4": {
            "address": null,
            "city": "Loveland",
            "country": "USA",
            "gmaps_place_id": null,
            "gmaps_url": null,
            "key": "frc1977",
            "lat": null,
            "lng": null,
            "location_name": null,
            "motto": null,
            "name": "NASA/Northrop Grumman/Ottercares/US Engineering&Loveland High School",
            "nickname": "The PowerSquids",
            "postal_code": "80538",
            "rookie_year": 2006,
            "school_name": "Loveland High School",
            "state_prov": "Colorado",
            "team_number": 1977,
            "website": "http://www.powersquidsrobotics.com/"
        },
        "5": {
            "address": null,
            "city": "Boulder",
            "country": "USA",
            "gmaps_place_id": null,
            "gmaps_url": null,
            "key": "frc2036",
            "lat": null,
            "lng": null,
            "location_name": null,
            "motto": null,
            "name": "Medtronic/Ball Aerospace & Technologies Corp/Solid State Depot&Family/Community",
            "nickname": "The Black Knights",
            "postal_code": "80305",
            "rookie_year": 2007,
            "school_name": "Family/Community",
            "state_prov": "Colorado",
            "team_number": 2036,
            "website": "https://blackknightsrobotics.com/"
        },
        "6": {
            "address": null,
            "city": "Conifer",
            "country": "USA",
            "gmaps_place_id": null,
            "gmaps_url": null,
            "key": "frc2083",
            "lat": null,
            "lng": null,
            "location_name": null,
            "motto": null,
            "name": "Ball Corporation/Lockheed Martin/Novelis/Comcast/Conifer Neighbors and Newcomers/CORE Electric Cooperative/Blue Spruce Kiwanis/Evergreen Rotary/Valentine Seevers and Associates /Wild Iris Marketing/Conifer Rotary/1Up Drones/ConexSmart/P17 Solutions/Evergreen Pilates/Dual Schneider Law & Evergreen High School & Conifer Senior High School",
            "nickname": "Team Blitz",
            "postal_code": "80433",
            "rookie_year": 2007,
            "school_name": "Evergreen High School & Conifer Senior High School",
            "state_prov": "Colorado",
            "team_number": 2083,
            "website": "http://www.teamblitz.net"
        },
        "7": {
            "address": null,
            "city": "Denver",
            "country": "USA",
            "gmaps_place_id": null,
            "gmaps_url": null,
            "key": "frc2240",
            "lat": null,
            "lng": null,
            "location_name": null,
            "motto": null,
            "name": "DSST Public Schools/F5 Networks/Ubergrippen Indoor Climbing Crag/Comcast/RevGen/The Delectable Egg/S.K. Grimes/Ball&Dsst-Stapleton Campus",
            "nickname": "Brute Force",
            "postal_code": "80238",
            "rookie_year": 2007,
            "school_name": "Dsst-Stapleton Campus",
            "state_prov": "Colorado",
            "team_number": 2240,
            "website": "http://www.dsstrobotics.org"
        },
        "8": {
            "address": null,
            "city": "Lafayette",
            "country": "USA",
            "gmaps_place_id": null,
            "gmaps_url": null,
            "key": "frc2972",
            "lat": null,
            "lng": null,
            "location_name": null,
            "motto": null,
            "name": "Medtronic/Hamamatsu/Harley Davidson/Dawson Parents Association/Friends of RC Dawson/Ball Aerospace/Boulder Ventures/Sinton Consulting/Steve Tanden/Maxx Properties/Dr. Pearlman/Dr. Gardner/Dawson School&Dawson School",
            "nickname": "Gears and Buccaneers",
            "postal_code": "80026",
            "rookie_year": 2009,
            "school_name": "Dawson School",
            "state_prov": "Colorado",
            "team_number": 2972,
            "website": "http:///RCDawson.org"
        },
        "9": {
            "address": null,
            "city": "Colorado Springs",
            "country": "USA",
            "gmaps_place_id": null,
            "gmaps_url": null,
            "key": "frc2996",
            "lat": null,
            "lng": null,
            "location_name": null,
            "motto": null,
            "name": "Vertec Tool, Inc/L3Harris/DoDSTEM/Exact Assembly LLC/Lockheed Martin/Azhanti Systems/Olson Plumbing and Heating/BPO Elks Lodge 309/N.A.W.I.C./Two Men and A Truck&Coronado High School",
            "nickname": "Cougars Gone Wired",
            "postal_code": "80904",
            "rookie_year": 2009,
            "school_name": "Coronado High School",
            "state_prov": "Colorado",
            "team_number": 2996,
            "website": "http://www.team2996.com"
        },
        "10": {
            "address": null,
            "city": "Centennial",
            "country": "USA",
            "gmaps_place_id": null,
            "gmaps_url": null,
            "key": "frc3200",
            "lat": null,
            "lng": null,
            "location_name": null,
            "motto": null,
            "name": "Intertech/Ball Aerospace/Lockheed Martin/Vector Consulting/Career and Technical Education/Hallmoore & Eaglecrest High School",
            "nickname": "Raptacon",
            "postal_code": "80015",
            "rookie_year": 2010,
            "school_name": "Eaglecrest High School",
            "state_prov": "Colorado",
            "team_number": 3200,
            "website": "http://www.raptacon.org/"
        },
        "11": {
            "address": null,
            "city": "Jackson",
            "country": "USA",
            "gmaps_place_id": null,
            "gmaps_url": null,
            "key": "frc3374",
            "lat": null,
            "lng": null,
            "location_name": null,
            "motto": null,
            "name": "Teton County School District/Wonder Institute/Jackson Hole Book Trader/Wilson Book Gallery/Epsilon Technology/in Memory of Buddy Temple III/Teton Toys/Jorgensen Engineering/GH2O Machining/Modern Light and Electric/Jackson Lumber&Jackson Hole High School",
            "nickname": "Jackson Hole RoboBroncs",
            "postal_code": "83001",
            "rookie_year": 2010,
            "school_name": "Jackson Hole High School",
            "state_prov": "Wyoming",
            "team_number": 3374,
            "website": "https://www.jhrobobroncs.com/"
        },
        "12": {
            "address": null,
            "city": "Aurora",
            "country": "USA",
            "gmaps_place_id": null,
            "gmaps_url": null,
            "key": "frc3729",
            "lat": null,
            "lng": null,
            "location_name": null,
            "motto": null,
            "name": "Regis Jesuit High School/Army Corp of Engineers/Lockheed Martin/RTX Raytheon/Zeta/Accudyne&Regis Jesuit Boys High School&Regis Jesuit Girls High School",
            "nickname": "The Raiders",
            "postal_code": "80016",
            "rookie_year": 2011,
            "school_name": "Regis Jesuit Girls High School & Regis Jesuit Boys High School",
            "state_prov": "Colorado",
            "team_number": 3729,
            "website": "http://rjrobotics.com"
        },
        "13": {
            "address": null,
            "city": "Monument",
            "country": "USA",
            "gmaps_place_id": null,
            "gmaps_url": null,
            "key": "frc4068",
            "lat": null,
            "lng": null,
            "location_name": null,
            "motto": null,
            "name": "Techno Chaos/NASA/DoDSTEM/Boeing/Monument Hill Kiwanis/Gene Haas Foundation/Monumental Impact/Lockheed Martin/Chevron/Palmer Ridge Booster Club/Lewis-Palmer School District 38&Palmer Ridge High School&Family/Community",
            "nickname": "Bearbotics",
            "postal_code": "80132",
            "rookie_year": 2012,
            "school_name": "Family/Community & Palmer Ridge High School",
            "state_prov": "Colorado",
            "team_number": 4068,
            "website": "https://www.bearbotics4068.org"
        },
        "14": {
            "address": null,
            "city": "Louviers",
            "country": "USA",
            "gmaps_place_id": null,
            "gmaps_url": null,
            "key": "frc4293",
            "lat": null,
            "lng": null,
            "location_name": null,
            "motto": null,
            "name": "Young Engineers Association/Superior Metal Products/Lockheed Martin/Google&Young Engineers Association",
            "nickname": "Komodo",
            "postal_code": "80129",
            "rookie_year": 2012,
            "school_name": "Young Engineers Association",
            "state_prov": "Colorado",
            "team_number": 4293,
            "website": "http:///www.youngengineers.us"
        },
        "15": {
            "address": null,
            "city": "Littleton",
            "country": "USA",
            "gmaps_place_id": null,
            "gmaps_url": null,
            "key": "frc4418",
            "lat": null,
            "lng": null,
            "location_name": null,
            "motto": null,
            "name": "STEM School Highlands Ranch/Ventana Capital/Lockheed Martin/Association for Manufacturing Technology/Intuitive Foundation/Ball Aerospace/Visa&STEM School Highlands Ranch",
            "nickname": "Team IMPULSE",
            "postal_code": "80129",
            "rookie_year": 2012,
            "school_name": "STEM School Highlands Ranch",
            "state_prov": "Colorado",
            "team_number": 4418,
            "website": "http://frc4418.org/"
        },
        "16": {
            "address": null,
            "city": "Fort Collins",
            "country": "USA",
            "gmaps_place_id": null,
            "gmaps_url": null,
            "key": "frc4499",
            "lat": null,
            "lng": null,
            "location_name": null,
            "motto": null,
            "name": "Lockeed Martin/Neaera Consulting/Front Range Powder Coating/Metal Distributors/Intuitive Foundation/DNK Kilts/Mountain West Farm Bureau Insurance&Neaera Robotics&Neaera Robotics 501c3",
            "nickname": "The Highlanders",
            "postal_code": "80528",
            "rookie_year": 2013,
            "school_name": "Neaera Robotics 501c3 & Neaera Robotics",
            "state_prov": "Colorado",
            "team_number": 4499,
            "website": "https://www.highlandersFRC.com"
        },
        "17": {
            "address": null,
            "city": "Englewood",
            "country": "USA",
            "gmaps_place_id": null,
            "gmaps_url": null,
            "key": "frc4550",
            "lat": null,
            "lng": null,
            "location_name": null,
            "motto": null,
            "name": "Lockheed Martin/All About Braces/Aakar Architects/Kathleen Hoff/Anny Bridges & Cherry Creek High School",
            "nickname": "Something's Bruin",
            "postal_code": "80111",
            "rookie_year": 2013,
            "school_name": "Cherry Creek High School",
            "state_prov": "Colorado",
            "team_number": 4550,
            "website": "https://www.somethingsbruin.org"
        },
        "18": {
            "address": null,
            "city": "Grand Junction",
            "country": "USA",
            "gmaps_place_id": null,
            "gmaps_url": null,
            "key": "frc4944",
            "lat": null,
            "lng": null,
            "location_name": null,
            "motto": null,
            "name": "Chevron &Hi Fives Robotics",
            "nickname": "The Hi Fives",
            "postal_code": "81503",
            "rookie_year": 2014,
            "school_name": "Hi Fives Robotics",
            "state_prov": "Colorado",
            "team_number": 4944,
            "website": "https://www.hi5robotics.com/"
        },
        "19": {
            "address": null,
            "city": "Englewood",
            "country": "USA",
            "gmaps_place_id": null,
            "gmaps_url": null,
            "key": "frc5493",
            "lat": null,
            "lng": null,
            "location_name": null,
            "motto": null,
            "name": "St. Mary's Academy/Walker Coles Family/Comcast NBCUniversal/Accelerated Chemical Efficiencies/United Launch Alliance/Kettering University/Buckshot Trucking/Clearwater/Jax's Law&St Mary'S Academy",
            "nickname": "SMAbotics AG",
            "postal_code": "80113",
            "rookie_year": 2015,
            "school_name": "St Mary'S Academy",
            "state_prov": "Colorado",
            "team_number": 5493,
            "website": "https://smabotics.com"
        },
        "20": {
            "address": null,
            "city": "Salt Lake City",
            "country": "USA",
            "gmaps_place_id": null,
            "gmaps_url": null,
            "key": "frc5933",
            "lat": null,
            "lng": null,
            "location_name": null,
            "motto": null,
            "name": "NASA/Department of Defense STEM/3M&Judge Memorial Catholic HS",
            "nickname": "NASA JudgeMent Call",
            "postal_code": "84102",
            "rookie_year": 2016,
            "school_name": "Judge Memorial Catholic HS",
            "state_prov": "Utah",
            "team_number": 5933,
            "website": "https://jmrobotics5933.wordpress.com"
        },
        "21": {
            "address": null,
            "city": "Craig",
            "country": "USA",
            "gmaps_place_id": null,
            "gmaps_url": null,
            "key": "frc7485",
            "lat": null,
            "lng": null,
            "location_name": null,
            "motto": null,
            "name": "Moffat County School District/NW Colorado Parrot Head Club/Kiwanis Club of Craig./Moffat County Wrestling Supporters&Moffat County High School",
            "nickname": "Mo Co Robo",
            "postal_code": "81625",
            "rookie_year": 2019,
            "school_name": "Moffat County High School",
            "state_prov": "Colorado",
            "team_number": 7485,
            "website": null
        },
        "22": {
            "key": "frc9997",
            "team_number": 9997,
            "nickname": "Anglebotics"
        },
        "23": {
            "key": "frc9996",
            "team_number": 9996,
            "nickname": "The Kraken 2"
        },
        "24": {
            "key": "frc9995",
            "team_number": 9995,
            "nickname": "Up A Creek 2"
        },
        "25": {
            "key": "frc9994",
            "team_number": 9994,
            "nickname": "Power Squids 2"
        },
        "26": {
            "key": "frc9993",
            "team_number": 9993,
            "nickname": "Blitz 2"
        },
        "27": {
            "key": "frc9992",
            "team_number": 9992,
            "nickname": "Brute Force 2"
        },
        "28": {
            "key": "frc9991",
            "team_number": 9991,
            "nickname": "Cougars Gone Wired 2"
        },
        "29": {
            "key": "frc9990",
            "team_number": 9990,
            "nickname": "Jackson Hole RoboBroncs 2"
        },
        "30": {
            "key": "frc9998",
            "team_number": 9998,
            "nickname": "Bearbotics 2"
        },
        "31": {
            "key": "frc9989",
            "team_number": 9989,
            "nickname": "Komodo 2"
        },
        "32": {
            "key": "frc9999",
            "team_number": 9999,
            "nickname": "Highlanders 2"
        },
        "33": {
            "key": "frc9987",
            "team_number": 9988,
            "nickname": "Hi Fives 2"
        },
        "34": {
            "key": "frc9987",
            "team_number": 9987,
            "nickname": "Something's Bruin 2"
        },
        "35": {
            "key": "frc7737",
            "team_number": 7737,
            "nickname": "RaptorBotics"
        },
        "36": {
            "key": "frc8334",
            "team_number": 8334,
            "nickname": "Titan Robotics"
        },
        "37": {
            "key": "frc2945",
            "team_number": 2945,
            "nickname": "The Steel Mustangs"
        },
        "38": {
            "key": "frc4388",
            "team_number": 4388,
            "nickname": "Ridgebotics"
        },
        "39": {
            "key": "frc3648",
            "team_number": 3648,
            "nickname": "Sparta Robotica"
        }


    },
    "template": {
        "address": null,
        "city": "",
        "country": "",
        "gmaps_place_id": null,
        "gmaps_url": null,
        "key": "frc0",
        "lat": null,
        "lng": null,
        "location_name": null,
        "motto": null,
        "name": "Test Name",
        "nickname": "Loading...",
        "postal_code": "",
        "rookie_year": 0,
        "school_name": "",
        "state_prov": "",
        "team_number": 0,
        "website": ""
    }
}


const router = express.Router();
const getFromTBA = async (url: string): Promise<any> => {
    return got("https://www.thebluealliance.com/api/v3/" + url, {
        headers: {
            "X-TBA-Auth-Key": process.env.TBA_KEY
        }
    }).json();
}
const getFromStatbotics = async (url: string): Promise<any> => {
    return got("https://api.statbotics.io/" + url).json();
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
const autoSummery = {
    $concat: [
        {$toString: countAuto("hybrid")}, "|",
        {$toString: countAuto("mid")}, "|",
        {$toString: countAuto("top")}, " ",
        {
            $cond:
                {
                    if: "$auto.mobility",
                    then: "M",
                    else: ""
                }
        },
        {
            $switch: {
                branches: [
                    {case: {$eq: ["$auto.chargingStation", "engaged"]}, then: "E"},
                    {case: {$eq: ["$auto.chargingStation", "docked"]}, then: "D"}
                ],
                default: ""
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


const countCyclesFlat = {
    $project: {
        match: "$match",
        totalCycles: {$size: "$cycles"},
        autoScore: getAutoScore,
        auto: autoSummery,

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
const getContributedScoreFlat = {
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
        },
        scoreSummery: {
            $concat: [{$toString: "$hybridCount"}, "|", {$toString: "$midCount"}, "|", {$toString: "$topCount"}]
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
        matchesScouted: {$sum: 1},
        totalCycles: {$sum: "$totalCycles"},
        totalCyclesList: {$push: "$totalCycles"},
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
        scoreSummery: {$push: "$scoreSummery"},
        autoSummery: {$push: "$auto"},
        avgHighCycles: {$avg: "$topCount"},
        totalMidCycles: {$sum: "$midCount"},
        avgMidCycles: {$avg: "$midCount"},
        totalHybridCycles: {$sum: "$hybridCount"},
        avgHybridCycles: {$avg: "$hybridCount"},
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
        totalCycles: convertArray("$totalCyclesList"),
        avgHighCycles: "$avgHighCycles",
        avgMidCycles: "$avgMidCycles",
        avgHybridCycles: "$avgHybridCycles",
        autoSummery: convertArray("$autoSummery"),
        scoreSummery: convertArray("$scoreSummery"),
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
                        $last: {$split: ["$match", "m"]}
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
        countCyclesFlat,
        getContributedScoreFlat,
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
        countCyclesFlat,
        getContributedScoreFlat,
        groupTeams,
        addArrays
    ]
}


router.route("/events").get(async (req, res, next) => {
    Competition2023.find().then((data) => {
        res.send(data)
        console.log("2023/events" + " Requested");
    }).catch(next);
});
router.route("/event/:event").get((req, res, next) => {
        Promise.all([Competition2023.findById(req.params.event), getFromTBA("event/" + req.params.event)]).then(([event, tbaEvent]) => {
            // @ts-ignore
            res.send({...event?.toObject(), ...tbaEvent});
            console.log("2023/event/:event" + " Requested");
        }).catch(next)
    }
);
router.route("/event/:event/matches/simple").get((req, res, next) => {
    getFromTBA("event/" + req.params.event + "/matches/simple").then((matches) => {
        res.send(matches);
        console.log("2023/event/:event/matches/simple" + " Requested");
    }).catch(next)
})
router.route("/event/:event/matches/keys").get((req, res, next) => {
    getFromTBA("event/" + req.params.event + "/matches/keys").then((matches) => {
        res.send(matches);
        console.log("2023/event/:event/matches/keys" + " Requested");
    }).catch(next)
})
router.route("/event/:event/matches/flat").get((req, res, next) => {
    Promise.all([competition2023Model.aggregate(getSummary(req.params.event)), getFromTBA("event/" + req.params['event'] + "/teams"), getFromTBA("/event/" + req.params.event + "/oprs"), getFromTBA("/event/" + req.params.event + "/rankings")]).then(([matches, tbaTeams, tbaOPR, tbaRankings]) => {
        let final = matches.map((match) => {
            let nickname = tbaTeams.find((team: any) => {
                return team.key === match._id;
            });
            let rank = tbaRankings.rankings.find((team: any) => {
                return team.team_key === match._id;
            });
            if (nickname != undefined) {
                nickname = nickname.nickname;
            }
            let winLossRatio: any;
            let numMatchesPlayed: any;
            if (rank != undefined) {
                // console.log(rank);
                winLossRatio = rank.record.wins + " | " + rank.record.losses + " | " + rank.record.ties;
                // console.log(winLossRatio);
                numMatchesPlayed = rank.matches_played;
                rank = rank.rank;
            }


            return {
                ...match,
                "nickname": nickname,
                "opr": tbaOPR.oprs[match._id],
                "rank": rank,
                "winLossRatio": winLossRatio,
                "numMatchesPlayed": numMatchesPlayed
            }
        })
        res.send(final);
        console.log("2023/event/:event/matches/flat" + " Requested");
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
        console.log("2023/event/:event/practiceMatches/flat" + " Requested");
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
        console.log("2023/event/:event/matches" + " Requested");
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
        console.log("2023/event/:event/practiceMatches" + " Requested");
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
            console.log("2023/event/:event/matches/flat" + " Patched");
        }).catch(next)
    }).catch(next)
});


/* POSTs*/
router.route("/event").post((req, res, next) => {
    console.log(req.body);
    Competition2023.create(req.body)
        .then((event) => {
            res.send(event)
            console.log("2023/event" + " Posted");
        })
        .catch(next)
});

// let kcmtTeams = require('./kcmtTeams.json');
kcmtTeams = kcmtTeams.teams;
// console.log(kcmtTeams);

router.route("/event/:event/tbaTeams").get((req, res, next) => {
        Promise.all([getFromTBA("event/" + req.params['event'] + "/teams")]).then(([tbaEventTeams]) => {
            // @ts-ignore
            let finalTeams = {...tbaEventTeams, ...kcmtTeams};
            res.send({...tbaEventTeams});
            console.log("2023/event/:event/tbaTeams" + " Requested");
        }).catch(next);
    }
);
router.route("/event/:event/team/:team/matches").get((req, res, next) => {
        // @ts-ignore
        Competition2023.aggregate(getAllMatchesTeam(req.params.event, req.params.team)).then(
            (matches) => {
                res.send(matches)
                console.log("2023/event/:event/team/:team/matches" + " Requested");
            }
        ).catch(next)
    }
)
router.route("/event/:event/team/:team/autos").get((req, res, next) => {
        Competition2023.aggregate(getTeamAutos(req.params.event, req.params.team)).then(
            (autos) => {
                res.send(autos)
                console.log("2023/event/:event/team/:team/autos" + " Requested");
            }
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
        console.log("2023/event/:event/match/:match/team" + " Posted");
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
        console.log("2023/event/:event/practiceMatch" + " Posted");
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
        console.log("2023/event/:event/match/:match/team/:team" + " Requested");
    }).catch(next)
});


export default router;