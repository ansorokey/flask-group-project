const GET_HABITS = 'habits/GET_HABITS'
const CREATE_HABIT = 'habits/CREATE_HABIT';
const UPDATE_HABIT = 'habits/UPDATE_HABIT';

function addHabitsToReducer(fetchedHabits) {
    return {
        type: GET_HABITS,
        fetchedHabits
    }
}

function addOneNewHabit(habit) {
    return {
        type: CREATE_HABIT,
        habit: habit
    }
}

function makeChange(habit) {
    return {
        type: UPDATE_HABIT,
        habit: habit
    }
}

export function getUserHabits() {
    return async (dispatch) => {
        const response = await fetch(`/api/habits/`);

        if(response.ok){
            const data = await response.json();
            dispatch(addHabitsToReducer(data));
        }
    }
}

export function createUserHabit(data) {
    return async (dispatch) => {
        const response = await fetch('/api/habits/', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        });

        if(response.ok) {
            const res = await response.json();
            dispatch(addOneNewHabit(res));
        }
    }
}

export function updateHabit(habitId, data) {
    return async (dispatch) => {
        const response = await fetch(`api/habits/${habitId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        });

        if(response.ok){
            const res = await response.json();
            dispatch(makeChange(res))
        }
    }
}

function reducer(state={}, action) {
    let newState = {};

    switch(action.type) {
        case GET_HABITS:
            action.fetchedHabits.forEach(h => newState[h.id] = h);
            return newState;
        case CREATE_HABIT:
            newState = {...state}
            newState[action.habit.id] = action.habit;
            return newState;
        case UPDATE_HABIT:
            newState = {...state}
            newState[action.habit.id] = action.habit
        default:
            return state;
    }
}

export default reducer;
