import dotenv from "dotenv-flow"
dotenv.config()

import createError from "http-errors"
import express, { Request, Response, NextFunction } from "express"
import session from "express-session";
import passport from "passport";
import mongoose from "mongoose";
import passportConfig from "./authentication/passportConfig";
import authRoute from "./routes/auth.route";
import cors from "cors"

//middleware
const app = express();

app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
}))
app.use(session({
    secret: process.env.SESSION_SECRET as string,
    resave: true,
    saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())
passportConfig(passport);
app.use("/auth", authRoute);


mongoose.connect(process.env.SCOUT_DB_URI as string, {}, (err: any) => {
    if (err) throw err;
    console.log("Connected to mongoose")
})


app.use(express.json())
app.use((req, res, next) => {
    next(createError(404, 'Not Found'))

})

//Error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    res.status(err.status || 500);
    res.send({
        error: {
            status: err.status || 500,
            message: err.message
        }
    })

})

const port = process.env.PORT || 5000; // process.env.port is Heroku's port
app.listen(port, () => console.log(`Server up and running on port ${port}`))