import { useState } from "react";

// Will eventually take individual habits as an argument
function HabitItem({habit}){
    const [showOptionsIcon, setShowOptionsIcon] = useState(false);
    const [showOptions, setShowOptions] = useState(false);
    const [menuIsOpen, setMenuIsOpen] = useState(false);
    const [posCount, setPosCount] = useState(0)
    const [negCount, setNegCount] = useState(0)

    const optionsMenu = <div className="habits-options-menu">
        <div>Edit</div>
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
