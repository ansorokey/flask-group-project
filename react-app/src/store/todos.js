// ACTION TYPES
const LOAD_USER_TODOS = 'todos/LOAD_USER_TODOS';
const ADD_USER_TODO = 'todos/ADD_USER_TODO';
const UPDATE_USER_TODO = 'todos/UPDATE_USER_TODO';
const DELETE_USER_TODO = 'todos/DELETE_USER_TODO';

// ACTION CREATORS
const loadUserTodos = (todos) => ({
    type: LOAD_USER_TODOS,
    todos,
});

const addUserTodo = (todo) => ({
    type: ADD_USER_TODO,
    todo,
});

const updateUserTodo = (todo) => ({
    type: UPDATE_USER_TODO,
    todo,
});

const deleteUserTodo = (todoId) => ({
    type: DELETE_USER_TODO,
    todoId,
});

// THUNKS

export const getTodosForUser = (userId) => async dispatch => {
    try {
        const response = await fetch(`/api/todos/users/${userId}/todos`);

        if (response.ok) {
            const todos = await response.json();
            dispatch(loadUserTodos(todos));
        } else {
            const errorData = await response.json();
            throw new Error(errorData.errors || "Error fetching todos.");
        }
    } catch (error) {
        console.error("Error in getTodosForUser thunk:", error.message);
    }
};

export const createTodoForUser = (userId, todoData) => async dispatch => {
    try {
        const response = await fetch(`/api/todos/users/${userId}/todos`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(todoData),
        });

        if (response.ok) {
            const newTodo = await response.json();
            dispatch(addUserTodo(newTodo));
            return newTodo;
        } else {
            const errorData = await response.json();
            throw new Error(errorData.errors || "Error creating todo.");
        }
    } catch (error) {
        console.error("Error in createTodoForUser thunk:", error.message);
    }
};

export const editTodoForUser = (userId, todoId, todoData) => async dispatch => {
    try {
        const response = await fetch(`/api/todos/users/${userId}/todos/${todoId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(todoData),
        });

        if (response.ok) {
            const updatedTodo = await response.json();
            dispatch(updateUserTodo(updatedTodo));
            return updatedTodo;
        } else {
            const errorData = await response.json();
            throw new Error(errorData.errors || "Error updating todo.");
        }
    } catch (error) {
        console.error("Error in editTodoForUser thunk:", error.message);
    }
};

export const removeTodoForUser = (userId, todoId) => async dispatch => {
    try {
        const response = await fetch(`/api/todos/users/${userId}/todos/${todoId}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            dispatch(deleteUserTodo(todoId));
        } else {
            const errorData = await response.json();
            throw new Error(errorData.errors || "Error deleting todo.");
        }
    } catch (error) {
        console.error("Error in removeTodoForUser thunk:", error.message);
    }
};

// INITIAL STATE
const initialState = [];

// REDUCER
const todosReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_USER_TODOS:
            return action.todos;
        case ADD_USER_TODO:
            return [...state, action.todo];
        case UPDATE_USER_TODO:
            return state.map(todo =>
                todo.id === action.todo.id ? action.todo : todo
            );
        case DELETE_USER_TODO:
            return state.filter(todo => todo.id !== action.todoId);
        default:
            return state;
    }
};

export default todosReducer;
export const selectTodos = (state) => state.todos;
