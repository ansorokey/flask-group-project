import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectTodos, createTodoForUser, editTodoForUser, removeTodoForUser, getTodosForUser, markTodoAsCompleted } from '/Users/alexflorea/Desktop/LevelUp/flask-group-project/react-app/src/store/todos.js';
import { useModal } from '../../context/Modal'; 
import TodoForm from './todoform';
import TodoDetails from './tododetails'; 
import './todo.css';

function ToDoCont() {
  const todos = useSelector(selectTodos);
  const user = useSelector(state => state.session.user);
  const userId = user ? user.id : null;
  const dispatch = useDispatch();

  const [newTodo, setNewTodo] = useState('');
  const [activeTab, setActiveTab] = useState('Scheduled');

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
        initialTitle={newTodo}
        onSubmit={(data) => {
          handleAddTodo(data);
          setModalContent(null); 
        }}
        onCancel={() => setModalContent(null)} 
      />
    );
};


  const handleAddTodo = (data) => {
    if(userId) {
      dispatch(createTodoForUser(userId, data));
      setNewTodo(''); 
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

  const handleMarkComplete = (todoId) => {
    if(userId) {
      dispatch(markTodoAsCompleted(userId, todoId, true));
    } else {
      console.error("User ID not found");
    }
  };

  const handleShowDetails = (todo) => {
    setModalContent(
      <TodoDetails 
        todo={todo} 
        onEdit={handleEditTodo}
        onDelete={handleDeleteTodo}
        onComplete={handleMarkComplete}
        onClose={() => setModalContent(null)}
      />
    );
  };
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

  const filteredTodos = sortedTodos.filter(todo => {
    if (activeTab === 'Scheduled') {
      return todo.due_date && !todo.completed;
    } else if (activeTab === 'Active') {
      return !todo.completed && !todo.due_date;
    } else {
      return todo.completed;
    }
  });

  return (
    <div className="todo-container">
      <h2>Quests</h2>
      <div className="todo-tab-container">
        <button onClick={() => setActiveTab('Scheduled')}>Scheduled</button>
        <button onClick={() => setActiveTab('Active')}>Active</button>
        <button onClick={() => setActiveTab('Completed')}>Completed</button>
      </div>
      <div className="todo-input-container">
        <input 
          type="text" 
          value={newTodo} 
          onChange={(e) => setNewTodo(e.target.value)} 
          placeholder="Add Quest Title..." 
        />
        <button onClick={openAddQuestModal}>Add Quest</button>
      </div>
  
      <div className="todo-list">
        {filteredTodos.map(todo => (
          <div key={todo.id} className="todo-item-container" onClick={() => handleShowDetails(todo)}>
            <div className="todo-item">
              {todo.title} 
              {todo.due_date && `- Due: ${new Date(todo.due_date).toLocaleDateString()}`}
            </div>
          </div>
        ))}
      </div>
    </div>
  );  
}

export default ToDoCont;
