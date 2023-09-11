import React, { useState } from 'react';
import './todo.css';

function TodoForm({ initialData, initialTitle = '', onSubmit, onCancel }) {
  console.log(initialData);
  const [formData, setFormData] = useState({
    title: initialData ? initialData.title : initialTitle,
    description: initialData ? initialData.description : '',
    due_date: initialData && initialData.due_date ? new Date(initialData.due_date).toISOString().split('T')[0] : ''
  });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      onSubmit(formData);
    };
  
    // Get current date without converting to UTC
    const currentDate = new Date().toISOString().slice(0, 10);

    return (
      <form onSubmit={handleSubmit} className="todo-form-ctn">
        <div className="todo-form-group">
          <label className="todo-form-label">Title: </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Add Title"
            className="todo-form-input"
            required
          />
        </div>
  
        <div className="todo-form-group">
          <label className="todo-form-label">Description: </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            className="todo-form-textarea"
            required
          />
        </div>
  
        <div className="todo-form-group">
          <label className="todo-form-label">Due Date: </label>
          <input
            type="date"
            name="due_date"
            value={formData.due_date}
            onChange={handleChange}
            placeholder="Due Date"
            className="todo-form-input"
            min={currentDate}
          />
        </div>
  
        <div className="todo-form-buttons">
          <button type="submit" className="todo-form-button save">Save</button>
          <button type="button" className="todo-form-button cancel" onClick={onCancel}>Cancel</button>
        </div>
      </form>
    );
}
  
export default TodoForm;
