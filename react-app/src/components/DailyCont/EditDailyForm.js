import { useState } from "react";
import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import { updateDaily, removeDaily, loadAllDailies } from "../../store/daily";

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
  // Errors from submit
  const [errors, setErrors] = useState()


  async function handleSubmit(e) {
    e.preventDefault();
    const newDaily = { title, description, strength, repeats_frame, repeats_frequency };
    console.log('!!!!!!!handleSubmit: updated daily!!!!!!!!!!!!')
    console.log(newDaily)
    const res = await dispatch(updateDaily(daily.id, newDaily));

    console.log("Response from updateDaily:", res); // Add this line

    if (res && Array.isArray(res)) {
      setErrors(res);
    } else {
      await dispatch(loadAllDailies());
      closeModal();
    }
  }

  const getTimeframe = () => {
    if (repeats_frame === "1") return "Days"
    else if (repeats_frame === "7") return "Weeks"
    else if (repeats_frame === "30") return "Months"
    else if (repeats_frame === "365") return "Years"
  }


  return (
    <div className="habit-edit-ctn">


      <div className="habit-title-and-btns">
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

    <form className="edit-habit-form" onSubmit={handleSubmit}>

      <div className="edit-form-top">

      <div className="habit-edit-input-ctn">
            <label>Title</label>
            <input
              type='text'
              value={title}
              placeholder="Add a title"
              className="edit-form-top-input"
              onChange={(e)=> setTitle(e.target.value)}
            />
            <div className="errors">{errors?.title}</div>
      </div>

          <div className="habit-edit-input-ctn">
            <label>Notes</label>

            <textarea
              placeholder="Add notes"
              className="edit-form-top-input"
              value={description}
              onChange={(e)=> setDescription(e.target.value)}
            />
          </div>
      </div>
      <div className="errors">{errors?.description}</div>


      <div className="edit-form-bottom">
            {/* This is where checklist input will go in the future */}

          <div className="edit-habit-select-ctn">
              <label>Difficulty </label>

              <select value={strength} onChange={(e) => setStrength(e.target.value)}>
                <option value="Trivial">Trivial</option>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>

              <div className="errors">{errors?.difficulty}</div>
          </div>



          {/* This is where Start date will go when it is implimented */}
          <div className="edit-habit-select-ctn">
            <label>Repeats</label>
            <select value={repeats_frame} onChange={(e) => setRepeats_frame(e.target.value)}>
              <option value="1">Daily</option>
              <option value="7">Weekly</option>
              <option value="30">Monthly</option>
              <option value="365">Yearly</option>
            </select>
            <div className="errors">{errors?.repeats_frame}</div>
          </div>

          <div className="edit-habit-select-ctn">
            <label>Repeat Every</label>
            <div>
              <input type='number' value={repeats_frequency} onChange={(e)=> setRepeats_frequency(e.target.value)} />    &ensp; <span className="timeFrame">{getTimeframe()}</span>
            </div>

            <div className="errors">{errors?.repeats_frequency}</div>
          </div>


          {/* This is where the tags input will go when that feature is implimented  */}




      <div className="advanced-options-ctn">

        <div className="advancedTitle" onClick={() => setAdvanced(!advanced)}>
          <div className="advanced-options-chevron">
              <label>Advanced Settings</label>

              { advanced ? <i className="fa-solid fa-caret-up"></i> : <i className="fa-solid fa-caret-down"></i> }

            </div>
        </div>

        { advanced &&
        <div className="advanced-options-menu" >

          <label id="streakLabel">Adjust Streak</label>

          <div className="advanced-counters">
            <div className="streakIcon">
              <i className="fa-solid fa-forward icon-forward"></i>

              <input type="number" value={streak} onChange={(e)=>{setStreak(e.target.value)}}/></div>

          </div>
        </div>

        }
        <div className="errors">{errors?.streak}</div>

      </div>
      </div>
  </form>

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

    </div>
  );
}

export default EditDailyForm;
