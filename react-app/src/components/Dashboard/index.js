import React from "react";
import HabitsCtn from "../HabitsContainer/HabitsCtn";
import UserBar from "../UserProfile/UserBar";
import './Dashboard.css';
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getStarterAvatars } from "../../store/avatar";
import DailyCont from "../DailyCont";
import ToDoCont from "../ToDoCont";
import Search from "../Search";

function Dashboard() {
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();

    useEffect(() => {
            dispatch(getStarterAvatars());
    }, [dispatch]);

    return (
      <>
        <UserBar user={user} />
        <Search />

        <div className="task-grid">
            <HabitsCtn />
            <DailyCont />
            <ToDoCont />
            <div>Rewards</div>
        </div>
      </>
    );
}

export default Dashboard;
