import React, { useState } from 'react';
import './todo.css';

function TodoForm({ initialData, initialTitle = '', onSubmit, onCancel }) {
  console.log(initialData);
  const [formData, setFormData] = useState({
    title: initialData ? initialData.title : initialTitle,
    description: initialData ? initialData.description : '',
    due_date: initialData && initialData.due_date ? new Date(initialData.due_date).toISOString().split('T')[0] : ''
  });

  const [titleError, setTitleError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Clear the error when the user starts editing again
    if (name === 'title' && titleError) {
      setTitleError('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.title.length > 50) {
      setTitleError('Title cannot be longer than 50 characters');
      return;
    }
    // Clear any existing error
    setTitleError('');
    onSubmit(formData);
  };

  // Get current date without converting to UTC
  const currentDate = new Date().toISOString().slice(0, 10);

  return (
    
    <form onSubmit={handleSubmit} className="todo-form-ctn">


      <div className="daily-edit-ctn">


    <div className="daily-title-and-btns" >


      {/* Title */}
      <div>
        Edit ToDo
      </div>

      {/* Buttons */}
       <div>
        <button className="daily-edit cancel" onClick={onCancel}>
          Cancel
        </button>
       <button type="submit" className="todo-form-button save">Save</button>
      </div>
    
    </div>
       <div classname='dat-boi'> 
   <div classname="daily-edit-form-top">
        <div className="daily-edit-input-ctn">
          {titleError && <div style={{ color: 'red' }}>{titleError}</div>}
          <label className="todo-form-label">Title: </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Add Title"
            className="daily-edit-form-top-input"
            required
          />
        </div>
    </div>
      <div className="daily-edit-input-ctn">
        <label className="todo-form-label">Description: </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          className="daily-edit-form-top-input"
          required
        />
      </div>

      <div className="daily-edit-input-ctn">
        <label className="todo-form-label">Due Date: </label>
        <input
          type="date"
          name="due_date"
          value={formData.due_date}
          onChange={handleChange}
          placeholder="Due Date"
          className="daily-edit-form-top-input"
          min={currentDate}
        />
      </div>
</div> 
      <div className="todo-form-buttons">
        {/* <button type="submit" className="todo-form-button save">Save</button> */}
        {/* <button type="button" className="todo-form-button cancel" onClick={onCancel}>Cancel</button> */}
      </div>
      </div>
    </form>
  );
}

export default TodoForm;
