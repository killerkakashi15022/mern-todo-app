const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "mern_todo_secret_key";

router.post("/register", async (req, res) => {
    try {
        const { email, username, password } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        const hashpassword = bcrypt.hashSync(password, 10);

        const user = new User({
            email,
            username,
            password: hashpassword
        });

        await user.save();

        res.status(200).json({
            message: "User registered successfully",
            user
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Internal server error"
        });
    }
});

router.post("/signin", async (req, res) => {
    try {
        const user = await User.findOne({
            email: req.body.email
        });

        if (!user) {
            return res.status(400).json({
                message: "Please sign up first"
            });
        }

        const isPasswordCorrect = bcrypt.compareSync(
            req.body.password,
            user.password
        );

        if (!isPasswordCorrect) {
            return res.status(400).json({
                message: "Password is not correct"
            });
        }

        const token = jwt.sign(
            {
                id: user._id,
                email: user.email
            },
            JWT_SECRET,
            {
                expiresIn: "7d"
            }
        );

        const { password, ...others } = user._doc;

        res.status(200).json({
            message: "Login successful",
            token,
            others
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Internal server error"
        });
    }
});

module.exports = router;