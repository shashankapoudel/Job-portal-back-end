
import userModel from "../models/userModal.js"

export const updateUserController = async (req, res, next) => {
    console.log("here");
    const { name, email, lastName, password } = req.body
    if (!name || !email || !lastName || !password) {
        next('Please provide all fields')
    }
    const user = await userModel.findOne({ _id: req.body.user.userId })
    console.log(req.body.user)
    console.log(user)
    user.name = name
    user.lastName = lastName
    user.email = email
    user.password = password


    await user.save()
    const token = user.createJWT()
    res.status(200).json({
        user,
        token,
    });

};