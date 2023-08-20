const GET_HABITS = 'habits/GET_HABITS'

function addHabitsToReducer(fetchedHabits) {
    return {
        type: GET_HABITS,
        fetchedHabits
    }
}

export function getUserHabits() {
    return async (dispatch) => {
        const response = await fetch(`/api/habits`);

        if(response.ok){
            const data = await response.json();
            dispatch(addHabitsToReducer(data));
        }
    }
}

function reducer(state={}, action) {
    switch(action.type) {
        case GET_HABITS:
            const newState = {}
            action.fetchedHabits.forEach(h => newState[h.id] = h)
            return newState;
        default:
            return state;
    }
}

export default reducer;
