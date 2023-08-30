import React from "react"
import HabitsCtn from "../HabitsContainer/HabitsCtn"
import UserBar from "../UserProfile/UserBar";
import './Dashboard.css';
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getStarterAvatars } from "../../store/avatar";
import DailyCont from "../DailyCont";

function Dashboard() {
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();

    useEffect(() => {
            dispatch(getStarterAvatars())
    }, [dispatch]);


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
