import bcrypt from 'bcryptjs';
import db from '../models';
const salt = bcrypt.genSaltSync(10);

let createNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassworkFromBcrypt = await hashUserPasswork(data.password)
            await db.User.create({
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                address: data.address,
                password: hashPassworkFromBcrypt,
                gender: data.gender === "1" ? true : false,
                roleID: data.roleID,
                phoneNumber: data.phoneNumber
            })
            resolve("Ok create a new user succeed")
        }
        catch (e) {
            reject(e);
        }
    })

}

let hashUserPasswork = (passwork) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPasswork = await bcrypt.hashSync(passwork, salt);
            resolve(hashPasswork)
        }
        catch (e) {
            reject(e)
        }
    })
}

let getAllUsers = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = db.User.findAll({ raw: true });
            resolve(users)
        }
        catch (e) {
            reject(e);
        }
    })
}

let getUserDataById = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let dataUser = await db.User.findOne({
                where: { id: userId }
            })
            resolve(dataUser)
        }
        catch (e) {
            reject(e)
        }
    })
}

let updateUserData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let dataUser = await db.User.findOne({
                where: { id: data.id }
            })
            if (dataUser) {
                dataUser.firstName = data.firstName
                dataUser.lastName = data.lastName
                dataUser.address = data.address
                await dataUser.save()
            }
            let users = db.User.findAll({ raw: true });
            resolve(users)
        }
        catch (e) {
            reject(e)
        }
    })
}
module.exports = {
    createNewUser: createNewUser,
    getAllUsers: getAllUsers,
    getUserDataById: getUserDataById,
    updateUserData: updateUserData,
}