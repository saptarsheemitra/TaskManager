const Task = require("../models/tasks");

const getAllTasks = async (req, res, next) => {
    await Task.find({})
        .then((allTask) => {
            res.send(allTask)
        })
        .catch((err) => {
            console.error(err)
        })
};

const createTask = async (req, res, nest) => {
    try {
        const task = await Task.create(req.body)
        res.status(201).json(task);
    } catch (error) {
        res.status(300).send("Invalid Input")
    }
};
const getSingleTask = async (req, res, next) => {
    const { id: taskID } = req.params;
    try {
        const singleTask = await Task.findOne({ _id: taskID });
        if (!singleTask) {
            return res.status(404).send("No matching ID task found")
        }
        return res.send(singleTask);
    } catch (error) {
        console.log(error);
        return res.status(501).send("Error")
    }

};

const updateTask = async (req, res, next) => {
    const {id: taskID} = req.params;
    try {
        const taskUpdate = await Task.findOneAndUpdate({_id:taskID}, req.body, {
            new:true,
            runValidators:true,
        })

        if(!taskUpdate) {
            return res.status(404).send("Data not found");
        };

        return res.send(taskUpdate)
        
    } catch (error) {
        console.log(error);
        res.status(500).send(error)
    }
};

const deleteTask = async (req, res, next) => {
    const { id: taskID } = req.params;
    try {
        const deleteTask = await Task.findOneAndDelete({ _id: taskID });
        if (!deleteTask) {
            return res.status(404).send("No matching ID task found")
        }

        return res.send(deleteTask);

    } catch (error) {
        console.log(error);
        res.status(500).send(error)
    }
};

module.exports = {
    getAllTasks,
    createTask,
    getSingleTask,
    updateTask,
    deleteTask,
};
