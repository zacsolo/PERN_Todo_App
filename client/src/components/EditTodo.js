import React, { useState } from 'react';

export default function EditTodo({ todo, updateDescription }) {
  const [description, setDescription] = useState(todo.description);

  return (
    <>
      <button
        type='button'
        className='btn btn-primary'
        data-toggle='modal'
        data-target={`#${todo.todo_id}`}>
        Edit
      </button>
      <div
        className='modal'
        id={`${todo.todo_id}`}
        onClick={() => setDescription(todo.description)}>
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h4 className='modal-title'>Edit todo</h4>
              <button
                type='button'
                className='close'
                data-dismiss='modal'
                onClick={() => setDescription(todo.description)}>
                &times;
              </button>
            </div>
            <div className='modal-body'>
              <input
                type='text'
                className='form-controll'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className='modal-footer'>
              <button
                type='button'
                className='btn btn-primary'
                data-dismiss='modal'
                onClick={(e) => updateDescription(e, description, todo)}>
                Save
              </button>
              <button
                type='button'
                className='btn btn-danger'
                data-dismiss='modal'
                onClick={() => setDescription(todo.description)}>
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
