import React from "react"
import HabitsCtn from "../HabitsContainer/HabitsCtn"
import './Dashboard.css';
import { useSelector } from "react-redux";

function Dashboard() {
    const user = useSelector(state => state.session.user);

    return <>
        <div className="user-bar">
            <div className="user-info">
                <div className="user-avatar-ctn"></div>
                <div className="user-stats">
                    <div>{user.username}</div>
                    <div>{user.email}</div>
                </div>
            </div>
        </div>

        <div className="task-grid">
            <HabitsCtn />
            <div>Dailies</div>
            <div>To-Dos</div>
            <div>Rewards</div>
        </div>
    </>
}

export default Dashboard;
