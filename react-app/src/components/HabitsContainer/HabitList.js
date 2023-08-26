import HabitItem from "./HabitItem";

// gives each habit a list item
function HabitList({habits}) {
    const footer = <div className="habit-list-footer">
        <div>Logo</div>
        <div>These are your Habits</div>
        <div>Habits don't have a rigid schedule. You can check them off multiple times per day.</div>
    </div>

    // THE COMPONENT -------------------------------------------------------------------------------
    return <div className="habit-list">
        {habits.map(h => <HabitItem habit={h} key={h.id} />)}
        {habits.length <= 3 && footer}
    </div>
}

export default HabitList;
