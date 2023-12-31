import express from "express";
import bodyParser from "body-parser";
import configViewEngine from "./config/viewEngin";
import initWebRoutes from "./route/web";
import connectDB from "./config/connectDB"
require('dotenv').config()

let port = process.env.PORT || 8080
let app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

configViewEngine(app)
initWebRoutes(app)
connectDB();

app.listen(port, () => { console.log("running on " + port) })