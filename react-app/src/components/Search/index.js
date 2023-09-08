import "./Search.css";
import { useState, useEffect } from "react";

function Search() {
    const [tagsOpen, setTagsOpen] = useState(false);
    const [tasksOpen, setTasksOpen] = useState(false);

    // 100% credit to Christine on this
    useEffect(() => {
        const closeMenuOutsideClick = (e) => {
          if (tagsOpen || tasksOpen) {
            setTagsOpen(false);
            setTasksOpen(false);
          }
        };
        document.addEventListener("click", closeMenuOutsideClick);
        return () => {
          document.removeEventListener("click", closeMenuOutsideClick);
        };
      }, [tagsOpen, tasksOpen]);

    const taskOptions = (
        <div
            className="task-options"
        >
            <div>
                <i className="fa-solid fa-cubes-stacked"></i>
                Habit
            </div>
            <div>
                <span>📆</span>
                Daily
            </div>
            <div>To Do</div>
            <div>Reward</div>
        </div>
    );

    return (<div className="search-ctn">
        <form>
            <input
                className="search-input"
                type="text"
                placeholder="Search"
            />
        </form>

        <div
            className="search-tags"
            onClick={() => setTagsOpen(!tagsOpen)}
        >
            <i className="fa-solid fa-sliders"></i>
            <span
                className="search-tags-text"
            >
                Tags
            </span>
            {tagsOpen ? <i className="fa-solid fa-caret-up"></i> : <i className="fa-solid fa-caret-down"></i>}
            {tagsOpen &&
                <div className="tags-menu">
                    <p>Feature coming <s>never</s> soon!</p>
                    <img src="https://res.cloudinary.com/dzntryr5a/image/upload/v1694130506/Rowlet-Pokemon-Transparent-PNG_xr1qfl.png"/>
                </div>
            }
        </div>

        <div
            className="search-add-task"
            onClick={() => setTasksOpen(!tasksOpen)}
        >
            <i className="fa-solid fa-plus"></i>
            <span
                className="add-task-text"
            >
                    Add Task
            </span>
            {tasksOpen && taskOptions}
        </div>
    </div>);
}

export default Search;
