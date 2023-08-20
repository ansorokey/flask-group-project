import { useState } from "react";
// import { useModal } from '../../context/Modal';
import OpenModalButton from "../OpenModalButton";
import EditHabitForm from "../EditHabitForm/EditHabitForm.js"
import { useDispatch } from "react-redux";
import { updateHabit } from "../../store/habits";

// Will eventually take individual habits as an argument
function HabitItem({habit}){
    const dispatch = useDispatch();
    const [showOptionsIcon, setShowOptionsIcon] = useState(false);
    const [showOptions, setShowOptions] = useState(false);
    const [menuIsOpen, setMenuIsOpen] = useState(false);

    // const { setModalContent } = useModal();

    const optionsMenu = <div className="habits-options-menu">
        <OpenModalButton
            buttonText="Edit"
            modalComponent={<EditHabitForm />}
        />
        {/* <span onClick={() => setModalContent(<EditHabitForm />)}>Edit</span> */}
        <hr/>
        <div>To top</div>
        <hr/>
        <div>To bottom</div>
        <hr/>
        <div>Delete</div>
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

    return <div className="habit-item" onMouseEnter={showOptionsMenuIconOnHover} onMouseLeave={hideOptionsOnExit}>
        <div className="habit-item-button" onClick={incHabit}><i class="fa-regular fa-plus"></i></div>

        <div className="habit-item-content">
            <div>{habit.title}</div>
            {showOptionsIcon && <button onClick={displayOrHideMenu}>options</button>}
            {showOptions && optionsMenu}
            {habit.notes && habit.notes.length && <div>{habit.notes}</div>}
            <div className="habit-item-counts">Counter: {habit.posCount} | {habit.negCount}</div>
        </div>

        <div><button className="habit-item-button" onClick={decHabit}>-</button></div>

    </div>
}

export default HabitItem;
