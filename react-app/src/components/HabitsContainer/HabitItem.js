// Will eventually take individual habits as an argument
function HabitItem({habit}){
    return <div>
        <button>+</button>
        <span>{habit.title}</span>
        <button>-</button>
    </div>
}

export default HabitItem;
