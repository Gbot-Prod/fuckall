import "./ToDoList.css"
import { useState, useEffect } from "react";
import { useSortable } from "@dnd-kit/react/sortable";

type SortableProps = {
  id: string;
  index: number;
  onDelete: (index: number) => void;
}

function Sortable({ id, index, onDelete }: SortableProps) {
  const { ref } = useSortable({ id, index });

  return (
    <li ref={ref} className="item"> 
      <span className="text">{id}</span>
      <button className="deleteButton" onClick={() => onDelete(index)}>
        Delete
      </button>
    </li>
  );
}

function ToDoList() {
  const [tasks, setTasks] = useState<string[]>(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : ["eat breakfast", "eat dog"]
  });
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks])

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setNewTask(event.target.value)
  }

  function addTask() {
    if(newTask.trim() !== "") {
      setTasks(t => [...t, newTask]);
      setNewTask("")
    }
  }

  function deleteTask(index: number) {
    setTasks(prev => prev.filter((_, i) => i !== index));
  }

  return (
    <div className="toDoList">
      <h1>To Do List</h1>

      <div className="taskInputContainer">
        <input
          className="taskInput"
          type="text"
          placeholder="Enter a Task"
          value={newTask}
          onChange={handleInputChange}
        />
        <button className="addButton" onClick={addTask}>Add</button>
      </div>
      
      <div className="taskList">
        {tasks.map((task, index) =>
            <Sortable 
              key={task} 
              id={task} 
              index={index}
              onDelete={deleteTask}
            />
        )}
      </div>
    </div>
  );
}

export default ToDoList;