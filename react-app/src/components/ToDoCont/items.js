import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import {  removeTodoForUser, markTodoAsCompleted } from "../../store/todos"; // Consider renaming this action if it's specifically for todos
import { useModal } from "../../context/Modal";
import  TodoForm  from "./todoform"
import "../DailyCont/daily.css" // Consider renaming this stylesheet if it's specifically for todos
function DisplayTodoItems({ todo, onEdit, onDelete, onComplete, onClose  }) {

  const [showMenu, setShowMenu] = useState(false);

  const { setModalContent } = useModal();
  const dispatch = useDispatch();
  const ulRef = useRef(null);

  useEffect(() => {
    const closeMenuOutsideClick = (e) => {
      if (showMenu) {
        setShowMenu(false);
      }
    };
    document.addEventListener("click", closeMenuOutsideClick);
    return () => {
      document.removeEventListener("click", closeMenuOutsideClick);
    };
  }, [showMenu]);

  const todoMenu = (
    <div className="daily-options-menu" ref={ulRef}>
      <button className="todo-details-edit-button" onClick={() => onEdit(todo.id, todo)}> <i className="fa-solid fa-pen"></i>Edit</button>
      <hr />
      <button className="todo-details-delete-button" onClick={() => { onDelete(todo.id); onClose(); }}><i className="fa-solid fa-trash-can"></i>  Delete</button>
    </div>
  );

  const markComplete = (id, completed) => {

    onComplete(id, completed); // Consider renaming this action if it's specifically for todos
  };

  return (
    <div className="dailyItem">
      <div className={`dailyCheckbox ${todo.completed ? 'completed' : 'notCompleted'}`}>
        <div className="checkbox">
          <input
            type="checkbox"
            className="hiddenCheck"
            id={`todoCheckbox_${todo.id}`}
            checked={todo.completed}
            onChange={(e) => {
              markComplete(todo.id, todo.completed);
            }}
          />
          <label htmlFor={`todoCheckbox_${todo.id}`} className="checkbox-label"></label>
        </div>
      </div>
      <div className="dailyTitle">
        {todo.title}
      </div>
      <div className="dailyDesc">
        {todo.description}
      </div>
      <div className="dailyItemRight">
        <div className="options">
          <div
            className="daily-options-btn"
            title="options"
            onClick={() => setShowMenu(!showMenu)}
          >
            <i className="fa-solid fa-ellipsis-vertical"></i>
          </div>

          {showMenu && todoMenu}
        </div>
      </div>
    </div>
  );
}

export default DisplayTodoItems;
