/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react";

const TodoList = (props) => {
  const [todos, setTodos] = useState(props.tab || []);
  const [task, setTask] = useState("");

  const addTask = () => {
    setTodos([...todos, task]);
    setTask("");
  };

  const removeTask = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  return (
    <div>
      <h2 data-testid="todo-title">Liste des tâches</h2>
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Nouvelle tâche"
        data-testid="task-input"
      />
      <button onClick={addTask} data-testid="add-button">Ajouter</button>
      <ul data-testid='task-list'>
        {todos.map((todo, index) => (
          <li key={index}>
            {todo}{" "}
            <button onClick={() => removeTask(index)} data-testid={`delete-button-${index}`}>Supprimer</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;