import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectTodos, createTodoForUser, editTodoForUser, removeTodoForUser, getTodosForUser, markTodoAsCompleted } from '../../store/todos';
import { useModal } from '../../context/Modal';
import TodoForm from './todoform';
import TodoDetails from './tododetails';
import DisplayTodoItems from './items'
import './todo.css';
function ToDoCont() {
  const todos = useSelector(selectTodos);
  const user = useSelector(state => state.session.user);
  const userId = user ? user.id : null;
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState('Scheduled'); // Initialized with 'Scheduled' as the default active tab  const [activeTab, setActiveTab] = useState('Scheduled');
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

  const handleMarkComplete = (todoId, currentStatus) => {

    if(userId) {
      dispatch(markTodoAsCompleted(userId, todoId, !currentStatus));
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
    <div className='toDo_cont'>
      <div className="todo-header-container">
        <div className="quests" >ToDos</div>
        <div className="todo-tab-container">
          <div className={`scheduledQuest ${activeTab === 'Scheduled' ? 'active' : ''}`} onClick={() => setActiveTab('Scheduled')}>Scheduled</div>
          <div className={`activeQuest ${activeTab === 'Active' ? 'active' : ''}`} onClick={() => setActiveTab('Active')}>Active</div>
          <div className={`completedQuest ${activeTab === 'Completed' ? 'active' : ''}`} onClick={() => setActiveTab('Completed')}>Completed</div>
        </div>
      </div>
      <div className="greyBox">


      <div className="todo-input-container">
     <input
      type="text"
      value={newTodo}
      onChange={(e) => setNewTodo(e.target.value)}
      onKeyPress={(e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          openAddQuestModal();
        }
      }}
      placeholder="Add a ToDo"
    />
      </div>

      <div className="todo-list">
          {filteredTodos.map(todo => (
            <DisplayTodoItems key={todo.id} todo={todo}
            onEdit={handleEditTodo}
            onDelete={handleDeleteTodo}
            onComplete={handleMarkComplete}
            onClose={() => setModalContent(null)} />
          ))}
        </div>
      </div>
    </div>
  );
}
export default ToDoCont;
