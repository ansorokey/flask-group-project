const ADD_AVATARS = 'avatars/GET_STARTER_AVATARS';

function addAvatars(avArr) {
    return {
        type: ADD_AVATARS,
        payload: avArr
    }
}

export function getStarterAvatars() {
    return async (dispatch) => {
        const response = await fetch('api/avatars/starters');

        if(response.ok) {
            const res = await response.json();
            dispatch(addAvatars(res));
        }
    }
}

function reducer(state={}, action) {
    let newState= {};

    switch(action.type) {
        case ADD_AVATARS:
            action.payload.forEach(av => {
                newState[av.id] = av;
            });
            return newState;

        default:
            return state;
    }
}

export default reducer;
