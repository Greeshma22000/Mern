import React from 'react'
import {CircleCheckBig, Circle} from "lucide-react";

const TodoItem = ({todo, toggleComplete, deleteTodo}) => {
  return (
    <div>
        <div onClick={() => toggleComplete(todo._id, todo.completed)}>
            {todo.completed ? (
                <CircleCheckBig size={22} />
            ) : (
                <Circle size={22} />
            )}
            <span
             className={`${todo.completed ? "line-through" : ""}`}
            >
                {todo.text}
            </span>
        </div>
        <button onClick={() => deleteTodo(todo._id)}>
            Delete
        </button>
    </div>
  );
};

export default TodoItem