import db from '../models/index'
import CRUDservices from '../service/CRUDservices'

let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll()
        return res.render('HomePage.ejs', {
            data: JSON.stringify(data)
        })
    }
    catch (e) {
        console.log(e)
    }
}

let getAboutPage = (req, res) => {
    return res.render('About.ejs')
}

let getCRUD = (req, res) => {
    return res.render('CRUD.ejs')
}

let postCRUD = async (req, res) => {
    let message = await CRUDservices.createNewUser(req.body)
    console.log(message)
    return res.send("Succeed")
}
let displayGetCRUD = async (req, res) => {
    let data = await CRUDservices.getAllUsers();
    console.log(data);
    return res.render('getCRUD.ejs', { dataUsers: data })
}

module.exports = {
    getHomePage: getHomePage,
    getAboutPage: getAboutPage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    displayGetCRUD: displayGetCRUD,
}