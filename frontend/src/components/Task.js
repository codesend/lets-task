import {FaCheckDouble, FaEdit, FaRegTrashAlt} from "react-icons/fa"

const Task = ({task, index, deleteTask}) => {
  return (
    <div className="task">
        <p>
            <b>{index + 1} </b>
            {task.name}
        </p>
        <div className="task-icons">
            <FaCheckDouble color="green"/>
            <FaEdit color="blue"/>
            <FaRegTrashAlt color="red" onClick={() =>
            deleteTask(task._id)}/>
        </div>
    </div>
  )
}

export default Task