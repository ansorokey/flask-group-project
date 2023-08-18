// need to import a reactState
import HabitItem from "./HabitItem.js"
import { useSelector } from "react-redux";
import { useState } from "react";
import "./habits.css"

function HabitsCtn() {
    const sessionUser = useSelector((state) => state.session.user);
    const [habitTitle, setHabitTitle] = useState('');
    const [habits, setHabits] = useState([]);

  function handleSubmit(e){
    //create the habit from form value
    //post habit to db
    //add habit to store
    //auto reload store
    //havit should appear at top, default order by is created at?
    //updating should retain order
    //reset form value
    // Dont allow the submission to go through yet
    e.preventDefault();
    const data = {
        title: habitTitle,
        user_id: sessionUser.id
    }

    alert(habitTitle)
  }

  function setSortActive(e){
    document.querySelectorAll(".habit_filter_by").forEach( sp => sp.className = "habit_filter_by")
    e.target.className += ' active'

  }

  return <div>
    <span>
      <h2>Habits</h2> <span className="habit_filter_by active" onClick={setSortActive}>All</span> <span className="habit_filter_by" onClick={setSortActive}>Weak</span> <span className="habit_filter_by" onClick={setSortActive}>Strong</span>
    </span>

    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={habitTitle}
        placeholder="Add a Habit"
        onChange={e => setHabitTitle(e.target.value)}/>
    </form>

    <h2>habits_list-ctn</h2>
    <HabitItem />
  </div>
}
export default HabitsCtn;
