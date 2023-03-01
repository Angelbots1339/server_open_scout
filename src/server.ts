import dotenv from "dotenv-flow"
import createError from "http-errors"
import express, { Request, Response, NextFunction } from "express"
import mongoose from "mongoose";
import authRoute from "./routes/comp.route";
import cors from "cors"
dotenv.config()


//middleware
const app = express();

app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
}))
app.use(express.json())

app.use("/2023", authRoute);


mongoose.connect(process.env.SCOUT_DB_URI as string, {}, (err: any) => {
    if (err) throw err;
    console.log("Connected to mongoose")
})


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

const port = process.env.PORT || 3001; // process.env.port is Heroku's port
app.listen(port, () => console.log(`Server up and running on port ${port}`))