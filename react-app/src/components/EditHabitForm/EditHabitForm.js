import { useState } from "react";
import { useModal } from "../../context/Modal";
import { useDispatch, useSelector } from "react-redux";
import { deleteHabit, updateHabit, createUserHabit } from "../../store/habits";
import './EditHabitForm.css';

function EditHabitForm({habit, edit=true}){
    const { closeModal } = useModal();
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);

    const [title, setTitle] = useState(habit.title);
    const [notes, setNotes] = useState(habit.notes);
    const [difficulty, setDifficulty] = useState(habit.difficulty);
    const [frequency, setFrequency] = useState(habit.frequency);
    const [pos, setPos] = useState(habit.pos);
    const [neg, setNeg] = useState(habit.neg);
    const [posCount, setPosCount] = useState(habit.posCount);
    const [negCount, setNegCount] = useState(habit.negCount);
    const [advanced, setAdvanced] = useState(false);
    const [errs, setErrs] = useState({});

    async function handleSubmit(e){
        e.preventDefault();
        const errors = {};

        if(!title.length) {
            errors.title = 'Title cannot be empty';
            setErrs(errors);
            return;
        }


        const data = {
            user_id: +user.id,
            title,
            notes,
            difficulty,
            frequency,
            'pos_count': +posCount,
            'neg_count': +negCount,
            pos,
            neg
        }

        if(edit){
            dispatch(updateHabit(habit.id, data));
        } else {
            dispatch(createUserHabit(data));
        }
        closeModal();
    }

    // THE COMPONENT ---------------------------------------------------------------------------------------
    return <div className="habit-edit-ctn">
        <div className="habit-title-and-btns">
            {edit ? <div>Edit Habit</div> : <div>Create Habit</div>}

            <div>
                <button
                    className="habit-edit cancel"
                    onClick={closeModal}
                >
                    Cancel
                </button>

                <button
                    onClick={(e) => {
                        handleSubmit(e);
                    }}
                    className="habit-edit save"
                >Save</button>
            </div>

        </div>



        <form className="edit-habit-form" onSubmit={handleSubmit}>
            <div className="edit-form-top">
                <div className="habit-edit-input-ctn">
                    <label>Title</label>
                    <input className="edit-form-top-input"
                        placeholder="Add a title..."
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    {errs.title}
                </div>

                <div className="habit-edit-input-ctn">
                    <label>Notes</label>
                    <textarea className="edit-form-top-input"
                        placeholder="Add Notes"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                    ></textarea>
                </div>
            </div>

            <div className='edit-form-bottom'>
                <div className="edit-habit-plus-and-minus">
                    <div className='habit-btn-ctn'>
                        <button
                            className={`pos-neg-habit-btn ${pos ? 'selected' : null}`}
                            onClick={(e) => {
                                e.preventDefault();
                                setPos(!pos)}
                            }
                        >
                            <i className="fa-solid fa-plus"></i>
                        </button>
                        <div>Positive</div>
                    </div>
                    <div className="habit-btn-ctn">
                        <button
                            className={`pos-neg-habit-btn ${neg ? 'selected' : null}`}
                            onClick={(e) => {
                                e.preventDefault();
                                setNeg(!neg)}
                            }
                        >
                            <i className="fa-solid fa-minus"></i>
                        </button>
                        <div>Negative</div>
                    </div>
                </div>

                <div className="edit-habit-select-ctn">
                    <label>Difficulty</label>
                    <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
                        <option value="1">Trivial</option>
                        <option value="2">Easy</option>
                        <option value="3">Medium</option>
                        <option value="4">Hard</option>
                    </select>
                </div>

                {/* Future Implementation */}
                {/* <div className="edit-habit-select-ctn">
                    <label>Tags</label>
                    <select>
                        <option>Need</option>
                        <option>To</option>
                        <option>Query</option>
                        <option>Tags</option>
                    </select>
                </div> */}

                <div className="edit-habit-select-ctn">
                    <label>Reset Counter</label>
                    <select value={frequency} onChange={(e) => setFrequency(e.target.value)}>
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                    </select>
                </div>

                {/* In order to show advanced options, habit must have at leaast one trait */}
                {(pos || neg) &&
                <div className="advanced-options-ctn" onClick={() => setAdvanced(!advanced)}>
                    <div className="advanced-options-chevron">
                        <div>Advanced Options</div>
                        { advanced ? <i className="fa-solid fa-caret-up"></i> : <i className="fa-solid fa-caret-down"></i> }
                    </div>
                </div>}
                {(pos || neg) && advanced &&
                    <div className="advanced-options-menu">
                        <label>Adjust Counter</label>
                        <div className="advanced-counters">
                            {pos && <div>
                                <i className="fa-regular fa-square-plus"></i>
                                <input type="number" value={posCount} min={0} onChange={e => setPosCount(e.target.value)} /></div>}
                            {neg && <div>
                                <i className="fa-regular fa-square-minus"></i>
                                <input type="number" value={negCount} min={0} onChange={e => setNegCount(e.target.value)} /></div>}
                        </div>
                    </div>
                }
            </div>

        </form>
        <div className="edit-habit-del">
            {edit && <button className="edit-habit-del-btn"
                    onClick={() => {
                        if(window.confirm('Are you sure you want to delete this habit?')) {
                            dispatch(deleteHabit(habit.id));
                            closeModal();
                        }
                    }}
            >
                <i className="fa-solid fa-trash-can"></i>
                Delete This Habit
            </button>}
        </div>
    </div>
}

export default EditHabitForm;
