import { useState } from "react";
import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import { updateDaily, removeDaily } from "../../store/daily";

function EditDailyForm({daily}) {
  const { closeModal } = useModal();
  const dispatch = useDispatch();

  //form elements to build object to send to backend
  const [title, setTitle] = useState(daily.title);
    const [description, setDescription] = useState(daily.description);
    const [strength, setStrength] = useState(daily.strength);
    const [repeats_frame, setRepeats_frame] = useState(daily.repeats_frame);
    const [repeats_frequency, setRepeats_frequency] = useState(daily.repeats_frequency);
    const [streak, setStreak] = useState(daily.streak)
  // to toggle advanced setting menu
  const [advanced, setAdvanced] = useState(false)


  async function handleSubmit(e) {
    e.preventDefault();
    const updatedDaily = {title, description, strength, repeats_frame, repeats_frequency}
    await dispatch(updateDaily(daily.id, updatedDaily))

  }


  return (
    <div className="daily-edit-ctn">


      <div className="daily-title-and-btns">
        <div>
          Edit Daily
        </div>

        <div>
          <button className="habit-edit cancel" onClick={closeModal}>
            Cancel
          </button>
          <button
            onClick={(e) => {
              handleSubmit(e);
              closeModal();
            }}
            className="habit-edit save">
              Save
          </button>
        </div>
      </div>

    <form className="editDailyForm" onSubmit={handleSubmit}>

      <div className="daily_addTitle_addDescription">

            <label>Title*</label>
            <input
              type='text'
              value={title}
              placeholder="Add a title"
              onChange={(e)=> setTitle(e.target.value)}
            />


          <div className="NotesTitleLineEditDaily">
            <label>Notes</label>
            <a href="https://habitica.fandom.com/wiki/Markdown_Cheat_Sheet"
              target="_blank" rel="noopener noreferrer">
                Markdown formatting help
            </a>
          </div>
            <textarea
              className="descriptionInputDaily"
              placeholder="Add notes"
              value={title}
              onChange={(e)=> setTitle(e.target.value)}
            />
      </div>


      <div className="otherDailyinputs">
            {/* This is where checklist input will go in the future */}

          <div className="difficultyTitleLine">
              <label>Difficulty
                <span className="difficultyInfo">
                  <i class="fa-regular fa-circle-info"></i>
                </span></label>
                <div className="explainDifficulty">
                  Difficulty describes how challenging a Habit, Daily, or To Do is for you to complete. A higher difficulty results in greater rewards when a Task is completed, but also greater damage when a Daily is missed or a negative Habit is clicked.
                </div>
          </div>
          <select value={strength} onChange={(e) => setStrength(e.target.value)}>
            <option value="Trivial">Trivial</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>

          {/* This is where Start date will go when it is implimented */}

          <label>Repeats</label>
          <select value={repeats_frame} onChange={(e) => setRepeats_frame(e.target.value)}>
            <option value="1">Daily</option>
            <option value="7">Weekly</option>
            <option value="30">Monthly</option>
            <option value="365">Yearly</option>
          </select>

          <label>Repeat Every</label>
          <input type='number' value={repeats_frequency} onChange={(e)=> setRepeats_frequency(e.target.value)} />

          {/* This is where the tags input will go when that feature is implimented  */}

      </div>


      <div className="advancedDailySettings">
        <div className="advancedTitle" onClick={() => setAdvanced(!advanced)}>
            <label>Advanced Settings</label>
            { advanced ? <i className="fa-solid fa-caret-up"></i> : <i className="fa-solid fa-caret-down"></i> }
        </div>
        { advanced &&
        <div className="advancedContent" >
          <label>Adjust Streak</label>
          <div className="streakInput">
              {/* icon */}
              <input type="number" value={streak} onChange={(e)=>{setStreak(e.target.value)}}/>
          </div>
        </div>}

      </div>


      <div className="edit-habit-del">
        <button className="edit-habit-del-btn"
          onClick={() => {
            if(window.confirm('Are you sure you want to delete this daily?')) {
              dispatch(removeDaily(daily.id));
              closeModal();
            }
          }}
        >
          <i className="fa-solid fa-trash-can"></i>
            Delete this Daily
        </button>
      </div>
    </form>
    </div>
  );
}

export default EditDailyForm;
