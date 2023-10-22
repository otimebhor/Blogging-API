const express = require("express");
const { UserSignUp, UserLogin } = require("./authController");
const { SignUpValidation , LoginValidation } = require("../middleware/userValidation");





const router = express.Router();

router.post('/signup', SignUpValidation, UserSignUp);
router.post('/login', LoginValidation, UserLogin);




const AuthRouter = router;

module.exports = { AuthRouter };