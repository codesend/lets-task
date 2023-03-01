const TaskForm = ({createTask, name, handleInputChange}) => {
  return <form className="task-form" onSubmit={createTask}>
         <input type="task" placeholder="Add a task"
         name="name" value={name} onChange={handleInputChange}/>
         <button type="submit">Add</button>
    </form>;
}

export default TaskForm