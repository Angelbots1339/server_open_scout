import passport, {PassportStatic} from "passport";
import User from "../models/User.model";
import {IMongoDBUser, IUser} from "../models/interfaces/user";
import {Google} from "./strategies";

export default (passport: PassportStatic) => {
    // used to serialize the user for the session
    passport.serializeUser((user: any, done: any) => {
        done(null, user.id);
    });


    passport.deserializeUser((id: any, done: any) => {

        User.findById(id, (err: Error, doc: IMongoDBUser) => {
            return done(null, doc);
        })
    });
    passport.use(Google)
}