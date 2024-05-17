import userModal from "../models/userModal.js";

export const registerController = async (req, res, next) => {

    const { name, email, password } = req.body
    //validate
    if (!name) {
        next('name is required');
    }
    if (!email) {
        next("email is required");
    }
    if (!password) {
        next("password is required")
    }
    const existingUser = await userModal.findOne({ email })
    if (existingUser) {
        next("Email already Register Please Login");
    }
    const user = await userModal.create({ name, email, password });
    //token
    const token = user.createJWT()
    res.status(201).send({
        success: true,
        message: 'User created successfully',
        user: {
            name: user.name,
            lastName: user.lastName,
            email: user.email,
            location: user.location,
        },
        token,
    });
};
export const loginController = async (req, res) => {
    const { email, password } = req.body
    //validation
    if (!email || !password) {
        next('Please provide all fields')
    }
    //find user by email
    const user = await userModal.findOne({ email }).select("+password");
    if (!user) {
        next('invalid username or password')
    }
    //compare password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        next('Invalid Username or password')
    }
    user.password = undefined;
    const token = user.createJWT()
    res.status(200).json({
        success: true,
        message: 'Login Successfully',
        user,
        token,

    });
};