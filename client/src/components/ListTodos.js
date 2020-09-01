import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EditTodo from './EditTodo';
import BASE_URL from '../constants';

const ListTodos = () => {
  const [todos, setTodos] = useState([]);

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/${id}`);
      setTodos(todos.filter((todo) => todo.todo_id !== id));
    } catch (error) {
      console.error(error.message);
    }
  };

  const getTodos = async () => {
    try {
      const response = await axios.get(BASE_URL);
      setTodos(response.data);
    } catch (error) {
      console.error(error.message);
    }
  };

  const updateDescription = async (e, description, todo) => {
    e.preventDefault();
    try {
      const newTodo = { ...todo, description };
      await axios.put(`${BASE_URL}/${todo.todo_id}`, newTodo);
      setTodos(
        todos.map((todo) => (todo.todo_id === newTodo.todo_id ? newTodo : todo))
      );
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <>
      <table className='table mt-5 text-center'>
        <thead>
          <tr>
            <th>Description</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => {
            return (
              <tr key={todo.todo_id}>
                <td>{todo.description}</td>
                <td>
                  <EditTodo todo={todo} updateDescription={updateDescription} />
                </td>
                <td>
                  <button
                    className='btn btn-danger'
                    onClick={() => deleteTodo(todo.todo_id)}>
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default ListTodos;
