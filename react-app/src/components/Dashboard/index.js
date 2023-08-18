import React from "react"
import HabitsCtn from "../HabitsContainer/HabitsCtn"

function Dashboard() {
    return <>
        <h1>This is our dashboard</h1>
        <div>Navigation Bar</div>
        <div>User Bar</div>
        <HabitsCtn />
        <div>Dailies</div>
        <div>To-Dos</div>
    </>
}

export default Dashboard;
