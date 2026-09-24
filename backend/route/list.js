const router = require("express").Router();
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const List = require("../models/list");

const JWT_SECRET = "mern_todo_secret_key";

const verifyToken = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                message: "Access denied. Token required"
            });
        }

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(token, JWT_SECRET);

        req.userId = decoded.id;

        next();
    } catch (error) {
        return res.status(401).json({
            message: "Invalid or expired token"
        });
    }
};

router.post("/addtask", verifyToken, async (req, res) => {
    try {
        const { title, body } = req.body;

        const existingUser = await User.findById(req.userId);

        if (!existingUser) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const list = new List({
            title,
            body,
            user: existingUser._id
        });

        await list.save();

        existingUser.list.push(list._id);
        await existingUser.save();

        res.status(201).json({
            message: "Task added successfully",
            list
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Internal server error"
        });
    }
});

router.get("/gettask", verifyToken, async (req, res) => {
    try {
        const existingUser = await User.findById(req.userId);

        if (!existingUser) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const tasks = await List.find({
            user: req.userId
        }).sort({
            createdAt: -1
        });

        res.status(200).json({
            message: "Tasks fetched successfully",
            list: tasks
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Internal server error"
        });
    }
});

router.delete("/deletetask/:id", verifyToken, async (req, res) => {
    try {
        const existingUser = await User.findById(req.userId);

        if (!existingUser) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const deletedList = await List.findOneAndDelete({
            _id: req.params.id,
            user: req.userId
        });

        if (!deletedList) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        existingUser.list.pull(req.params.id);
        await existingUser.save();

        res.status(200).json({
            message: "Task deleted successfully"
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Internal server error"
        });
    }
});

router.put("/updatetask/:id", verifyToken, async (req, res) => {
    try {
        const { title, body } = req.body;

        const updatedList = await List.findOneAndUpdate(
            {
                _id: req.params.id,
                user: req.userId
            },
            {
                title,
                body
            },
            {
                new: true,
                runValidators: true
            }
        );

        if (!updatedList) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        res.status(200).json({
            message: "Task updated successfully",
            list: updatedList
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Internal server error"
        });
    }
});

module.exports = router;