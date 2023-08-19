function EditHabitForm(){
    return <div>
        <div>
            <h1>Edit Habit</h1>
            <span>
                <button>Cancel</button>
                <button>Save</button>
            </span>
        </div>
        <form className="edit-habit-form">
            <div className="edit-form-top">
                <label>Title</label>
                <input type="text"
                    value="title goes here"
                />

                <label>Notes</label>
                <textarea
                    placeholder="Add Notes"
                ></textarea>
            </div>

            <div classname='edit-form-bottom'>
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

                <label>Difficulty</label>
                <select>
                    <option value="1">Trivial</option>
                    <option value="2">Easy</option>
                    <option value="3">Medium</option>
                    <option value="4">Hard</option>
                </select>

                <label>Tags</label>
                <select>
                    <option>Need</option>
                    <option>To</option>
                    <option>Query</option>
                    <option>Tags</option>
                </select>

                <label>Reset Counter</label>
                <select>
                    <option>Daily</option>
                    <option>Weekly</option>
                    <option>Monthly</option>
                </select>

                <div></div>
            </div>

        </form>
        <button>Delete This Habit</button>
    </div>
}
