// need to import a reactState
import HabitList from "./HabitList.js"
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import "./habits.css"

function HabitsCtn() {
    const sessionUser = useSelector((state) => state.session.user);
    const [habitTitle, setHabitTitle] = useState('');
    const [habits, setHabits] = useState([]);
    const [filteredHabits, setFilteredHabits] = useState(habits);
    const [filterBy, setFilterBy] = useState('All');

    useEffect(() => {
      setFilteredHabits(() => {
        switch (filterBy) {
          case 'All':
            return habits;
          case 'Weak':
            return habits.filter(h => h.strength == 'Weak');
          case 'Strong':
            return habits.filter(h => h.strength == 'Strong');
          default:
            return habits;
        }
      });
    }, [habits, filterBy]);

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
    console.log(e.target.id)
  }

  return <div>
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

    <h2>habits_list-ctn</h2>
    <HabitList habits={filteredHabits} />
  </div>
}
export default HabitsCtn;
