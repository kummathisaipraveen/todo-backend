import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const API_URL = "http://127.0.0.1:8000/tasks";

function App() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        const response = await axios.get(API_URL);
        setTasks(response.data);
    };

    const addTask = async () => {
        if (!newTask) return;
        const newTaskObj = { id: tasks.length + 1, title: newTask, completed: false };
        await axios.post(API_URL, newTaskObj);
        setNewTask("");
        fetchTasks();
    };

    const deleteTask = async (id) => {
        await axios.delete(`${API_URL}/${id}`);
        fetchTasks();
    };

    const toggleTaskCompletion = async (id) => {
        const updatedTasks = tasks.map((task) =>
            task.id === id ? { ...task, completed: !task.completed } : task
        );
        setTasks(updatedTasks);
    };

    return (
        <div className="container">
            <h2>To-Do List</h2>
            <input
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="Enter a task"
            />
            <button onClick={addTask}>Add Task</button>
            <ul>
                {tasks.map((task) => (
                    <li key={task.id} className={task.completed ? "completed" : ""}>
                        <span onClick={() => toggleTaskCompletion(task.id)}>{task.title}</span>
                        <button className="delete-btn" onClick={() => deleteTask(task.id)}>❌</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
