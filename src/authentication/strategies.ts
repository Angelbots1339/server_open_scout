
import User from "../models/User.model";
import {IMongoDBUser, IUser} from "../models/interfaces/user";
import {Error} from "mongoose";
import {Profile} from "passport";


const GoogleStrategy = require('passport-google-oauth20').Strategy;

export const Google = new GoogleStrategy({
        clientID: `${process.env.GOOGLE_CLIENT_ID}`,
        clientSecret: `${process.env.GOOGLE_CLIENT_SECRET}`,
        callbackURL: "/auth/google/callback"
    },
    function (_: any, __: any , profile: Profile, cb: any){
        User.findOne({googleId: profile.id}, async (err: Error, doc: IMongoDBUser) => {
            if(err){
                return cb(err, null)
            }
            if(!doc){
                const newUser = new User({
                    googleId: profile.id,
                    firstName: profile?.name?.givenName,
                    lastName: profile?.name?.familyName,
                    email: profile?.emails?.at(0)?.value
                })
                await newUser.save();
                cb(null, newUser)
            }
            cb(null, doc)
        })
    }
)