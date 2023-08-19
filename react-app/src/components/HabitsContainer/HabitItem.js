import { useState } from "react";
import { useModal } from '../../context/Modal';
import OpenModalButton from "../OpenModalButton";
import EditHabitForm from "../EditHabitForm/EditHabitForm.js"

// Will eventually take individual habits as an argument
function HabitItem({habit}){
    const [showOptionsIcon, setShowOptionsIcon] = useState(false);
    const [showOptions, setShowOptions] = useState(false);
    const [menuIsOpen, setMenuIsOpen] = useState(false);
    const [posCount, setPosCount] = useState(0)
    const [negCount, setNegCount] = useState(0)

    const { setModalContent } = useModal();

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
    function showOptionsMenuIconOnHover(){
        setShowOptionsIcon(true);
    }

    // hide options icon AND options menu when mouse leaves habit item
    function hideOptionsOnExit(){
        if(!menuIsOpen) setShowOptionsIcon(false);
    }

    // displays habit item options menu, or closes if already open
    function displayOrHideMenu(){
        setMenuIsOpen(prev => !prev);
        setShowOptions(prev => !prev);
    }

    return <div className="habit-item" onMouseEnter={showOptionsMenuIconOnHover} onMouseLeave={hideOptionsOnExit}>
        <span><button onClick={() => setPosCount(prev => prev + 1)}>+</button></span>

        <span>
            <div>{habit.title}</div>
            {showOptionsIcon && <button onClick={displayOrHideMenu}>options</button>}
            {showOptions && optionsMenu}
            {habit.notes && habit.notes.length && <div>{habit.notes}</div>}
            <span>Counter</span>
            <span>{posCount} | {negCount}</span>
        </span>

        <span><button onClick={() => setNegCount(prev => prev - 1)}>-</button></span>

    </div>
}

export default HabitItem;
