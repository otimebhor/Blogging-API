const jwt = rtequire('jsonwebtoken');
const { UserModel } = require("../User/userModel")








const protect = async (req, res, next) => {
    try {
    const authHeader = req.headers;

    if (!authHeader.authorization) {
        return res.status(401).json({ message: 'You are not authenticated!' });
    }

    const token = authHeader.authorization.split(' ')[1]; // berear tokenvalue

    const decoded = await jwt.verify(token, process.env.JWT_SECRET)
    // console.log({ decoded })

    // decoded { email: someemail@mail.com, _id: jshkdf }

    const user = await UserModel.findOne({ _id: decoded._id })
    
    if (!user) {
        return res.status(401).json({
            message: "Unauthorized",
        })
    }

    req.user = user;

    next()
    } catch (error) {
        console.log(error)
        return res.status(401).json({
            message: "Unauthorized",
        })
    }
}


module.exports = { protect };