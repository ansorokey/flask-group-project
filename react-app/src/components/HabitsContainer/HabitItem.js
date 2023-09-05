import { useState } from "react";
import { useModal } from '../../context/Modal';
import { useHabit } from "../../context/Habit";
import { useDispatch } from "react-redux";
import { updateHabit, deleteHabit } from "../../store/habits";

// Component Imports
// import OpenModalButton from "../OpenModalButton";
import EditHabitForm from "../EditHabitForm/EditHabitForm.js"

// Will eventually take individual habits as an argument
function HabitItem({habit}){
    const dispatch = useDispatch();
    const [showOptionsIcon, setShowOptionsIcon] = useState(false);
    const [showOptions, setShowOptions] = useState(false);
    const [menuIsOpen, setMenuIsOpen] = useState(false);

    const { setModalContent } = useModal();
    const { setHabits } = useHabit();

    const optionsMenu = <div className="habits-options-menu" onClick={displayOrHideMenu}>
        <div onClick={() => setModalContent(<EditHabitForm habit={habit} />)}>
            <i className="fa-solid fa-pen"></i>
            Edit
        </div>
        <hr/>

        <div onClick={() => setHabits(habits => {
            const index = habits.indexOf(habit);
            return [habit, ...habits.slice(0, index), ...habits.slice(index + 1)]})}>
            <i className="fa-solid fa-arrow-up"></i>
            To top
        </div>
        <hr/>

        <div onClick={() => setHabits(habits => {
            const index = habits.indexOf(habit);
            return [...habits.slice(0, index), ...habits.slice(index + 1), habit]})}>
            <i className="fa-solid fa-arrow-down"></i>
            To bottom
        </div>
        <hr/>

        <div onClick={() => {
            const res = window.confirm("Are you sure you want to delete this habit?");
            if(res){
                dispatch(deleteHabit(habit.id));
            }}}>
            <i className="fa-solid fa-trash-can"></i>
            Delete
        </div>
    </div>

    // display options icon when hovering over habit item
    function showOptionsMenuIconOnHover() {
        setShowOptionsIcon(true);
    }

    // hide options icon AND options menu when mouse leaves habit item
    function hideOptionsOnExit() {
        if(!menuIsOpen) setShowOptionsIcon(false);
    }

    // displays habit item options menu, or closes if already open
    function displayOrHideMenu() {
        setMenuIsOpen(prev => !prev);
        setShowOptions(prev => !prev);
    }

    function incHabit() {
        dispatch(updateHabit(habit.id, {'pos_count': habit.posCount + 1}))
    }

    function decHabit() {
        dispatch(updateHabit(habit.id, {'neg_count': habit.negCount + 1}))
    }

    function check_strength(str) {
        if(+str >= 12){
            return 'strongest';
        } else if(+str >= 6) {
            return 'stronger';
        } else if(+str >= 1) {
            return 'strong';
        } else if(+str === 0) {
            return 'neutral';
        } else if(+str <= -12){
            return 'weakest';
        } else if(+str <= -6){
            return 'weaker';
        } else if(+str <= -1){
            return 'weak';
        }
    }

    // THE COMPONENT ----------------------------------------------------------
    return <div className="habit-item"
                onMouseEnter={showOptionsMenuIconOnHover}
                onMouseLeave={hideOptionsOnExit}
            >

        {/* Incrememnt Button */}
        <div>
            <button
                className={`habit-item-button plus ${habit.pos ? 'inc-active' : 'inc-inactive'} ${check_strength(habit.strength)}`}
                onClick={ habit.pos ? incHabit : null}
                >
                <i className="fa-solid fa-plus"></i>
            </button>
        </div>

        {/* Habit Content */}
        <div className="habit-item-content">
            <div className="habit-item-title-and-options">
                {habit.title}
                {showOptionsIcon && <button className="habit-options-btn" title="options" onClick={displayOrHideMenu}>
                    <i className="fa-solid fa-ellipsis-vertical"></i>
                </button>}
                {showOptions && optionsMenu}
            </div>
            {habit.notes && habit.notes.length && <div>{habit.notes}</div>}
            <div className="habit-item-counts">
                {(habit.pos || habit.neg) && <i className="fa-solid fa-forward icon-forward"></i>}
                {habit.pos && habit.posCount}
                {habit.pos && habit.neg && <span>|</span>}
                {habit.neg && <span>-{habit.negCount}</span>}
            </div>
        </div>

        {/* Decrement button */}
        <div>
            <button
                className={`habit-item-button minus ${habit.neg ? 'inc-active' : 'inc-inactive'} ${check_strength(habit.strength)}`}
                onClick={habit.neg ? decHabit : null}
            >
                <i className="fa-solid fa-minus"></i>
            </button>
        </div>

    </div>
}

export default HabitItem;
