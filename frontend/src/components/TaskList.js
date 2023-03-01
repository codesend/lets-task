import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Task from "./Task";
import TaskForm from "./TaskForm";
import axios from "axios";
import { URL } from "../App";
import loaderCube from "../assets/loader.gif"

const TaskList = () => {
    const [tasks, setTasks] = useState([])
    const [completedTasks, setCompletedTasks] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState({
        name: "",
        completed: "false"
    })
    const {name} = formData;

    const handleInputChange = (e) => {
        const {name, value} = e.target
        setFormData({ ...formData, [name]: value })
    };

    const getTasks = async () => {
        setIsLoading(true);
        try {
            const {data} = await axios.get(`${URL}/api/tasks`);
            setTasks(data)
            setIsLoading(false);
        } catch (error) {
            toast.error(error.message);
            setIsLoading(false);
        }
    };

    useEffect(() => {
      getTasks()
    }, [])
    

    const createTask = async (e) => {
        e.preventDefault();
        if (name === "") {
            return toast.error("Input field cannot be empty")
        }
        try {
            await axios.post(`${URL}/api/tasks`, formData);
            toast.success("Task added");
            setFormData({ ...formData, name: ""});
        } catch (error) {
            toast.error(error);
        }
    };

  return (
    <div>
        <h2>Task Manager</h2>
        <TaskForm name={name} handleInputChange={handleInputChange} createTask={createTask}/>
        <div className="--flex-between --pb">
            <p>
                <b>Total Tasks:</b> 0
            </p>
            <p>
                <b>Completed Tasks:</b> 0
            </p>
        </div>
        <hr />
        {isLoading && (
                <div className="--flex-center">
                <img src={loaderCube} alt="Loading" />
                </div>
        )}
        {
            !isLoading && tasks.length === 0 ? (
            <p>No tasks exist! Please add a task.</p>
            ) : (
            <>
            {tasks.map(Task, index => {
                return (
                    <Task />
                )
                })}
            </>
            )
        }
    </div>
  )
}

export default TaskList