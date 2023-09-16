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
    return res.render('getCRUD.ejs', { dataUsers: data })
}

let editCRUD = async (req, res) => {
    let userId = req.query.id
    if (userId) {
        let userData = await CRUDservices.getUserDataById(userId)
        return res.render('editCRUD.ejs', {
            dataUser: userData
        })
    }
    else
        return res.send('dont find')
}

let putCRUD = async (req, res) => {
    let dataChange = req.body
    let allUsers = await CRUDservices.updateUserData(dataChange)
    return res.render('getCRUD.ejs', { dataUsers: allUsers })
}

module.exports = {
    getHomePage: getHomePage,
    getAboutPage: getAboutPage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    displayGetCRUD: displayGetCRUD,
    editCRUD: editCRUD,
    putCRUD: putCRUD,
}