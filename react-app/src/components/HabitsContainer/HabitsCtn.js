import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { getUserHabits, createUserHabit } from "../../store/habits.js"

// COMPONENT Import
import HabitList from "./HabitList.js"

// CSS Import
import "./habits.css"

function HabitsCtn() {
    const sessionUser = useSelector((state) => state.session.user);
    const habitState = useSelector((state) => state.habits);
    const habitsArr = Object.values(habitState);

    const [habitTitle, setHabitTitle] = useState('');
    const [habits, setHabits] = useState([]);
    const [filterBy, setFilterBy] = useState('All')
    const dispatch = useDispatch();

    // fetch habits and store them on page load
    // useEffect prefers to run a defined async function
    // rather than an async anonymous
    useEffect(() => {
      async function initialLoad() {
        dispatch(getUserHabits())
      }

      initialLoad();
    }, [dispatch]);

    // Modify filtered habits every time filter changes
    useEffect(() => {

      setHabits(() => {
        const filtersortHabits = Object.values(habitState);
        switch (filterBy) {
          case 'All':
            return filtersortHabits.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          case 'Weak':
            return filtersortHabits.filter(h => h.strength === 'Weak').sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          case 'Strong':
            return filtersortHabits.filter(h => h.strength === 'Strong').sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          default:
            return filtersortHabits.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      }});
    // habitState is the key to getting it to load upon refresh
    }, [filterBy, habitState]);

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
    document.querySelectorAll(".habit_filter_by").forEach( sp => sp.className = "habit_filter_by")
    e.target.className += ' active'
    setFilterBy(e.target.id)
  }

  // THE COMPONENT --------------------------------------------------------------------------------------------------------------
  return  <div className="habit-ctn">
    <div className="habit-title-and-sort">
      <h2>Habits</h2>
      <div className="habit-sorts">
        <span id="All" className="habit_filter_by active" onClick={setSortActive}>All</span>
        <span id="Weak" className="habit_filter_by" onClick={setSortActive}>Weak</span>
        <span id="Strong" className="habit_filter_by" onClick={setSortActive}>Strong</span>
      </div>
    </div>

    <form className="habit-quick-add" onSubmit={handleSubmit}>
      <input
        type="text"
        value={habitTitle}
        placeholder="Add a Habit"
        onChange={e => setHabitTitle(e.target.value)}/>
    </form>

    <HabitList habits={habits} />
  </div>
}
export default HabitsCtn;
