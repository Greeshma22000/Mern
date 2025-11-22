import React, { useState, useEffect } from 'react'
import axios from "axios";
import TodoForm from './component/TodoForm';
import TodoItem from './component/TodoItem';

const API_URL = "http://localhost:4001/api/todos";

const App = () => {
  const [todos, setTodos] = useState([]);

  const getTodos = async () => {
    const res = await axios.get(API_URL);
    setTodos(res.data);
    // console.log(res.data);
  };

  useEffect(() => {
    getTodos();
  }, []);

  const addTodo = async (text) => {
    try {
      const res = await axios.post(API_URL, {text});
      setTodos((prev) => [...prev, res.data]);
    } catch (error) {
      console.error("Add error:", error);
    }
  };

  const toggleComplete = async (id, completed) => {
    try {
      const res = await axios.put(`${API_URL}/${id}`, {completed: !completed});
      setTodos((prev) => prev.map((t) => (t._id === id ? res.data : t)));
    } catch (error) {
      console.error("Update error:", error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTodos((prev) => prev.filter((t) => t._id !== id));
    } catch (error) {
      console.error("Delete error:", error);
    }
  };


  return (
    <div>
      <div>
        <h1>📝 Todo List </h1>
        <TodoForm addTodo={addTodo} />
        <div>
          {todos.length === 0 ? (
            <p>No todos yet...</p>
          ) : (
            todos.map((todo) => (
              <TodoItem 
                key={todo._id}
                todo={todo}
                toggleComplete={toggleComplete}
                deleteTodo={deleteTodo}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default App