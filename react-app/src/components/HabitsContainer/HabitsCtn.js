// need to import a reactState
import HabitList from "./HabitList.js"
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import "./habits.css"
import { getUserHabits } from "../../store/habits.js"

function HabitsCtn() {
  // Use info from store
    const sessionUser = useSelector((state) => state.session.user);
    const habitState = useSelector((state) => state.habits);
    const habitsArr = Object.values(habitState);

    const [habitTitle, setHabitTitle] = useState('');
    const [habits, setHabits] = useState([]);

    // const [filteredHabits, setFilteredHabits] = useState(habits);
    const [filterBy, setFilterBy] = useState('All');
    const [loaded, setLoaded] = useState(false);
    const dispatch = useDispatch();

    // fetch habits and store them on page load
    useEffect(() => {
      console.log('fetching habits')
      async function initialLoad() {
        await dispatch(getUserHabits(sessionUser?.id))
      }
      if(!loaded) {
        initialLoad();
      }
    }, [dispatch]);

    // Modify filtered habits every time filter changes
    useEffect(() => {

      setHabits(() => {
        switch (filterBy) {
          case 'All':
            return habitsArr;
          case 'Weak':
            return habitsArr.filter(h => h.strength == 'Weak');
          case 'Strong':
            return habitsArr.filter(h => h.strength == 'Strong');
          default:
            return habitsArr;
      }});
      // setLoaded(true);
    }, [filterBy, habitState]);

  function handleSubmit(e){
    e.preventDefault();

    const newHabit = {
        title: habitTitle,
        user_id: sessionUser.id,
        strength: 'Weak',
        posCount: 0,
        negCount: 0
    }

    setHabits(prev => {
        const newVal = [newHabit, ...prev]
        return newVal;
    });

    setHabitTitle("");
  }

  function setSortActive(e){
    document.querySelectorAll(".habit_filter_by").forEach( sp => sp.className = "habit_filter_by")
    e.target.className += ' active'
    setFilterBy(e.target.id)
  }

  // THE COMPONENT --------------------------------------------------------------------------------------------------------------
  return  <div>
    <span>
      <h2>Habits</h2>
      <span id="All" className="habit_filter_by active" onClick={setSortActive}>All</span>
      <span id="Weak" className="habit_filter_by" onClick={setSortActive}>Weak</span>
      <span id="Strong" className="habit_filter_by" onClick={setSortActive}>Strong</span>
    </span>

    <form onSubmit={handleSubmit}>
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
