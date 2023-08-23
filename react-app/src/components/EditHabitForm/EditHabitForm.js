import { useState } from "react";
import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import { updateHabit } from "../../store/habits";
import './EditHabitForm.css';

function EditHabitForm({habit}){
    const { closeModal } = useModal();
    const dispatch = useDispatch();

    // const [, set] = useState('');
    const [title, setTitle] = useState(habit.title);
    const [notes, setNotes] = useState(habit.notes);
    const [difficulty, setDifficulty] = useState(habit.difficulty);
    const [frequency, setFrequency] = useState(habit.frequency);

    async function handleSubmit(e){
        e.preventDefault();
        const errors = {};

        if(!title.length) errors.title = 'Title cannot be empty';

        if(Object.values(errors).length) return;

        const data = {
            title,
            notes,
            difficulty,
            frequency
        }

        console.log(data);

        dispatch(updateHabit(habit.id, data));
    }


    return <div className="habit-edit-ctn">
        <div className="habit-title-and-btns">
            <div>Edit Habit</div>

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
                        closeModal();
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
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
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
                    <div className="habit-btn-ctn">
                        <button className="pos-neg-habit-btn">
                            <i className="fa-solid fa-plus"></i>
                        </button>
                        <div>Positive</div>
                    </div>
                    <div className="habit-btn-ctn">
                        <button className="pos-neg-habit-btn">
                            <i className="fa-solid fa-minus"></i>
                        </button>
                        <div>Negative</div>
                    </div>
                </div>

                <div>
                    <label>Difficulty</label>
                    <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
                        <option value="1">Trivial</option>
                        <option value="2">Easy</option>
                        <option value="3">Medium</option>
                        <option value="4">Hard</option>
                    </select>
                </div>

                <div>
                    <label>Tags</label>
                    <select>
                        <option>Need</option>
                        <option>To</option>
                        <option>Query</option>
                        <option>Tags</option>
                    </select>
                </div>

                <div>
                    <label>Reset Counter</label>
                    <select value={frequency} onChange={(e) => setFrequency(e.target.value)}>
                        <option value="Daily">Daily</option>
                        <option value="Weekly">Weekly</option>
                        <option value="Monthly">Monthly</option>
                    </select>
                </div>

                <div>Advanced Options</div>
            </div>

        </form>
        <div className="edit-habit-del">
            <button className="edit-habit-del-btn">
                <i className="fa-solid fa-trash-can"></i>
                Delete This Habit
            </button>
        </div>
    </div>
}

export default EditHabitForm;
