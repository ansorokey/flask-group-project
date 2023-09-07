    function TodoDetails({ todo, onEdit, onDelete, onComplete }) {
        return (
        <div className="todo-details">
            <h3>{todo.title}</h3>
            <p>{todo.description}</p>
            {todo.due_date && <p>Due Date: {new Date(todo.due_date).toLocaleDateString()}</p>}
            <button onClick={() => onEdit(todo.id, todo)}>Edit</button>
            <button onClick={() => onDelete(todo.id)}>Delete</button>
            {!todo.completed && <button onClick={() => onComplete(todo.id)}>Mark as Complete</button>}
        </div>
        );
    }
    
    export default TodoDetails;
    