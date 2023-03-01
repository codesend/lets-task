const dotenv = require("dotenv").config();
const express = require("express");
const connectDB = require("./config/connectDB");
const Task = require("./models/taskModel");


const app = express()

//Middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//Routes
app.get("/", (req, res) => {
    res.send("Home page");
});

//Create a task
app.post("/api/tasks", async (req, res) => {
    try {
    const task = await Task.create(req.body)
    res.status(200).json(task)
    } catch (error) {
    res.status(500).json({msg: error.message})
    }
})

const PORT = process.env.PORT || 5000

const startServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.log(error)
    }
};

startServer();