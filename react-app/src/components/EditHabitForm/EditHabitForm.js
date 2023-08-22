import { useState } from "react";
import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import { updateHabit } from "../../store/habits";

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


    return <div>
        <div>
            <span>Edit Habit</span>

            <span>
                <button
                    onClick={closeModal}
                >
                    Cancel
                </button>

                <button onClick={(e) => {
                    handleSubmit(e);
                    closeModal()
                }}>Save</button>
            </span>
        </div>

        <form className="edit-habit-form" onSubmit={handleSubmit}>
            <div className="edit-form-top">
                <div>
                    <label>Title</label>
                    <input type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>

                <div>
                    <label>Notes</label>
                    <textarea
                        placeholder="Add Notes"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                    ></textarea>
                </div>
            </div>

            <div className='edit-form-bottom'>
                <div>
                    <div>
                        <button>+</button>
                        <div>Positive</div>
                    </div>
                    <div>
                        <button>-</button>
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
        <button>Delete This Habit</button>
    </div>
}

export default EditHabitForm;
