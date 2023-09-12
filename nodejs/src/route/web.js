import express from "express";
import HomeController from "../controller/HomeController";
let router = express.Router()

let initWebRoutes = (app) => {
    router.get('/', HomeController.getHomePage)
    router.get('/About', HomeController.getAboutPage)
    router.get('/crud', HomeController.getCRUD)
    router.post('/post-crud', HomeController.postCRUD)
    router.get('/get-crud', HomeController.displayGetCRUD)
    return app.use("/", router)
}

export default initWebRoutes