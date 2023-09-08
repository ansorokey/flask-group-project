import "./todo.css"

function TodoDetails({ todo, onEdit, onDelete, onComplete, onClose }) {
    return (
        <div className="todo-details-container">
            <h3 className="todo-details-title">{todo.title}</h3>
            <p className="todo-details-description">{todo.description}</p>
            {todo.due_date && <p className="todo-details-due-date">Due Date: {new Date(todo.due_date).toLocaleDateString()}</p>}
            <div className="todo-details-buttons">
                <button className="todo-details-edit-button" onClick={() => onEdit(todo.id, todo)}>Edit</button>
                <button className="todo-details-delete-button" onClick={() => { onDelete(todo.id); onClose(); }}>Delete</button>
                {!todo.completed && <button className="todo-details-complete-button" onClick={() => {onComplete(todo.id); onClose();}}>Mark as Complete</button>}
            </div>
        </div>
    );
}

export default TodoDetails;
