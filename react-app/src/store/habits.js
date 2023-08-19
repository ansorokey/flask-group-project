const GET_HABITS = 'habits/GET_HABITS'

// function getHabits() {
//     return {
//         type: GET_HABITS
//     }
// }

export function getUserHabits(userId) {
    return async (dispatch) => {
        const response = await fetch(`/api/habits/${userId}`);

        if(response.ok){
            const data = await response.json();
            console.log(data);
        }
    }
}
