import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectTodos, createTodoForUser, editTodoForUser, removeTodoForUser, getTodosForUser } from '/Users/alexflorea/Desktop/LevelUp/flask-group-project/react-app/src/store/todos.js';
import { useModal } from '../../context/Modal'; 
import TodoForm from './todoform';
import './todo.css';

function ToDoCont() {
  const todos = useSelector(selectTodos);
  const user = useSelector(state => state.session.user);
  const userId = user ? user.id : null;
  const dispatch = useDispatch();

  const [newTodo, setNewTodo] = useState('');
  
  useEffect(() => {
    if(userId) {
      dispatch(getTodosForUser(userId));
    } else {
      console.error("User ID not found");
    }
  }, [dispatch, userId]); 

  const { setModalContent } = useModal();

  const openAddQuestModal = () => {
    setModalContent(
      <TodoForm 
        onSubmit={(data) => {
          handleAddTodo(data);
          setModalContent(null); // Close the modal after submitting
        }}
        onCancel={() => setModalContent(null)} // Close the modal if the user cancels
      />
    );
  };

  const handleAddTodo = (data) => {
    if(userId) {
      dispatch(createTodoForUser(userId, data));
      setNewTodo(''); // Reset the input field after adding a new todo
    } else {
      console.error("User ID not found");
    }
  };

  const handleEditTodo = (todoId, todoData) => {
    setModalContent(
      <TodoForm 
        initialData={todoData} 
        onSubmit={(data) => {
          handleEditTodoSubmit(todoId, data);
          setModalContent(null); 
        }}
        onCancel={() => setModalContent(null)}
      />
    );
  };
  
  const handleEditTodoSubmit = (todoId, data) => {
    if(userId) {
      dispatch(editTodoForUser(userId, todoId, data));
    } else {
      console.error("User ID not found");
    }
  };
  

  const handleDeleteTodo = (todoId) => {
    if(userId) {
      dispatch(removeTodoForUser(userId, todoId));
    } else {
      console.error("User ID not found");
    }
  };

  // Sort todos by due date
  const sortedTodos = todos.slice().sort((a, b) => {
    if (a.due_date && b.due_date) {
      return new Date(a.due_date) - new Date(b.due_date);
    } else if (a.due_date) {
      return -1;
    } else if (b.due_date) {
      return 1;
    } else {
      return 0;
    }
  });

  return (
    <div className="todo-container">
      <h2>Quests</h2>
      <div className="todo-input-container">
        <input 
          type="text" 
          value={newTodo} 
          onChange={(e) => setNewTodo(e.target.value)} 
          placeholder="Add a new quest title" 
        />
        <button onClick={openAddQuestModal}>Add Quest</button>
      </div>

      <div className="todo-list">
        {sortedTodos.map(todo => (
          <div key={todo.id} className="todo-item">
            {todo.title} 
            {/* If you also want to display the due date, you can include the following line */}
            {todo.due_date && `- Due: ${new Date(todo.due_date).toLocaleDateString()}`}
            <button onClick={() => handleEditTodo(todo.id, todo)}>Edit</button>
            <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ToDoCont;
