import React, { useState, useContext, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserHabits } from "../store/habits";

const HabitContext = React.createContext();

export function HabitProvider({children}) {
    const dispatch = useDispatch();
    const habitState = useSelector(state => state.habits);
    const [habits, setHabits] = useState([]);
    const [filterBy, setFilterBy] = useState('All');

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
              return filtersortHabits.filter(h => +h.strength < 1).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            case 'Strong':
              return filtersortHabits.filter(h => +h.strength > 0 ).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            default:
              return filtersortHabits.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        }});
      // habitState is the key to getting it to load upon refresh
      }, [filterBy, habitState]);

      return (
        <>
            <HabitContext.Provider value={{
                habits, setHabits,
                filterBy, setFilterBy
            }}>
                {children}
            </HabitContext.Provider>
        </>
      )
}

export const useHabit = () => useContext(HabitContext);
