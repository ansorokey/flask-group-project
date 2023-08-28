

const GET_ALL_DAILY = "daily/GET_ALL"

const getAllDaily = (dailies) => ({
    type: GET_ALL_DAILY,
    dailies
})

export const loadAllDailies = () => async dispatch => {
    const response = await fetch('api/dailies')
    if (response.ok) {
        const all = response.json()
        dispatch(getAllDaily(all))
    }
}


const initialState = {due:{}, notdue:{}, all:{}, order:[]}
export default function reducer(state = initialState, action) {
    const newState = {due:{...state.due}, notdue:{...state.notdue}, all: {...state.all}, order:[...state.order] }
    const today = new Date().toJSON().slice(0, 10)
	switch (action.type) {
		case GET_ALL_DAILY:
            action.all.forEach((daily)=>{
                newState.all[daily.id] = daily
                newState.order.push(daily.id)
                if(daily.due_date === today){
                    newState.due[daily.id] = daily
                } else {
                    newState.notdue[daily.id] = daily
                }
            })
			return newState ;
		default:
			return state;
	}
}
