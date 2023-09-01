

const GET_ALL_DAILY = "daily/GET_ALL"
const CREATE_UPDATE_DAILY = "daily/CREATE_UPDATE"
const DELETE_DAILY = "daily/DELETE"

const getAllDaily = (dailies) => ({
    type: GET_ALL_DAILY,
    dailies
})

const createOrUpdateDaily = (daily) => ({
    type: CREATE_UPDATE_DAILY,
    daily
})

const deleteDaily = id => ({
    type: DELETE_DAILY,
    id
})


export const loadAllDailies = () => async dispatch => {
    const response = await fetch('api/dailies/')
    if (response.ok) {
        const data = await response.json()
		// console.log('!!!!!!!!! right after the response')
		// console.log(data)
        dispatch(getAllDaily(data))
    } else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
}

export const createDaily = (daily) => async dispatch =>{
    const response = await fetch("/api/dailies/", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(daily),
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(createOrUpdateDaily(data));
		return null;
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
}

export const updateDaily = (id, daily) => async dispatch =>{
    const response = await fetch(`/api/dailies/${id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			daily
		}),
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(createOrUpdateDaily(data));
		return null;
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
}
export const completeDaily = (id) => async dispatch =>{
    const response = await fetch(`/api/dailies/${id}/completed`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		}
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(createOrUpdateDaily(data));
		return null;
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
}

export const removeDaily = id => async dispatch => {
    const response = await fetch(`/api/dailies/${id}`,{
        method: 'DELETE',
    })
    if (response.ok){
        dispatch(deleteDaily(id))
        return null
    }else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
}


const initialState = {due:{}, notdue:{}, all:{}, order:[]}
export default function reducer(state = initialState, action) {
    const newState = {due:{...state.due}, notdue:{...state.notdue}, all: {...state.all}, order:[...state.order] }
    const today = new Date().toJSON().slice(0, 10)
	switch (action.type) {
		case GET_ALL_DAILY:

            action.dailies.forEach((daily)=>{
                newState.all[daily.id] = daily
                newState.order.push(daily.id)

                if(daily.due_date === today){
                    newState.due[daily.id] = daily
                } else {
                    newState.notdue[daily.id] = daily
                }
            })
            return newState
        case CREATE_UPDATE_DAILY:
            newState.all[action.daily.id] = action.daily
            newState.order.push(action.daily.id)
            if(action.daily.due_date === today){
                newState.due[action.daily.id] = action.daily
            }else{
                newState.notdue[action.daily.id] = action.daily
            }
            return newState
        case DELETE_DAILY:
            delete newState.all[action.id]
            delete newState.due[action.id]
            delete newState.notdue[action.id]
            return newState
		default:
			return state;
	}
}
