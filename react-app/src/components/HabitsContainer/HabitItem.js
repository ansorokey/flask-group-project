import { useState } from "react";

// Will eventually take individual habits as an argument
function HabitItem({habit}){
    const [showOptionsIcon, setShowOptionsIcon] = useState(false);
    const [showOptions, setShowOptions] = useState(false);
    const [menuIsOpen, setMenuIsOpen] = useState(false);

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
        <button>+</button>
        <span>{habit.title}</span>
        {showOptionsIcon && <button onClick={displayOrHideMenu}>options</button>}
        <button>-</button>
        {showOptions && optionsMenu}
    </div>
}

export default HabitItem;
