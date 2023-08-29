import React from "react"
import HabitsCtn from "../HabitsContainer/HabitsCtn"
import UserBar from "../UserProfile/UserBar";
import './Dashboard.css';
import { useSelector } from "react-redux";
import DailyCont from "../DailyCont";

function Dashboard() {
    const user = useSelector(state => state.session.user);

    return <>
        <UserBar user={user} />

        <div className="task-grid">
            <HabitsCtn />
            <DailyCont />
            <div>To-Dos</div>
            <div>Rewards</div>
        </div>
    </>
}

export default Dashboard;
