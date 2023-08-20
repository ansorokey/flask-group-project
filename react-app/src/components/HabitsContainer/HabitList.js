import HabitItem from "./HabitItem";

// gives each habit a list item
function HabitList({habits}) {
    return habits.map(h => <HabitItem habit={h} key={h.id} />)
}

export default HabitList;
