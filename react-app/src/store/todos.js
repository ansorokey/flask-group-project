import { csrfFetch } from './csrf'; // since we're using csrfFetch utility

// ACTION TYPES
const SET_TODOS = 'todos/SET_TODOS';

// ACTION CREATORS
const setTodos = (todos) => ({
  type: SET_TODOS,
  todos
});

// THUNKS


// Thunk to fetch all todos from the server
export const getTodos = () => async dispatch => {
    try {
      // Use csrfFetch to make a request with CSRF protection.
      const response = await csrfFetch('/api/todos');  // Adjust this URL as per your final routes.
  
      // Check if the response status is OK.
      if (response.ok) {
        const todos = await response.json();
        dispatch(setTodos(todos));  // Dispatch the fetched todos to the store.
      } else {
        // If the response is not OK, it likely means there's an error on the server side.
        // We can get the error message from the response body and throw it.
        const errorData = await response.json();
        throw new Error(errorData.errors || "Error fetching todos.");
      }
    } catch (error) {
      console.error("Error in getTodos thunk:", error.message);
      // Optionally, dispatch an action to set an error state in your store.
      // dispatch(setErrorAction(error.message));
    }
  };
  

// INITIAL STATE
const initialState = [];

// REDUCER
const todosReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TODOS:
      return action.todos;
    default:
      return state;
  }
};

export default todosReducer;
