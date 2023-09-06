import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { createUserHabit } from "../../store/habits.js";
import { useHabit } from "../../context/Habit.js";
import HabitList from "./HabitList.js";
import "./habits.css"

function HabitsCtn() {
    const sessionUser = useSelector((state) => state.session.user);
    const { habits, setFilterBy } = useHabit();

    const [habitTitle, setHabitTitle] = useState('');
    const dispatch = useDispatch();

  function handleSubmit(e){
    e.preventDefault();

    // Validate fields
    if(!habitTitle.length) return;

    const newHabit = {
        title: habitTitle,
        user_id: sessionUser.id
    }

    // post habit
    dispatch(createUserHabit(newHabit));

    setHabitTitle("");
  }

  function setSortActive(e){
    document.querySelectorAll(".habit-filter-by").forEach( f => f.classList.remove('active'));
    e.target.classList.add('active');
    setFilterBy(e.target.id)
  }

  // THE COMPONENT --------------------------------------------------------------------------------------------------------------
  return  <div className="habit-ctn">
    <div className="habit-title-and-sort">
      <h2 className="task-header">Habits</h2>
      <div className="habit-sorts">
        <div id="All" className="habit-filter-by active" onClick={setSortActive}>All</div>
        <div id="Weak" className="habit-filter-by" onClick={setSortActive}>Weak</div>
        <div id="Strong" className="habit-filter-by" onClick={setSortActive}>Strong</div>
      </div>
    </div>

    <div className="ctn-btm">
      <form className="habit-quick-add" onSubmit={handleSubmit}>
        <input
          type="text"
          value={habitTitle}
          placeholder="Add a Habit"
          onChange={e => setHabitTitle(e.target.value)}/>
      </form>

      <HabitList habits={habits} />
    </div>
  </div>
}
export default HabitsCtn;
