import { useState } from "react";
import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";

function EditDailyForm() {
  const { closeModal } = useModal();
  const dispatch = useDispatch();

  async function handleSubmit(e) {
    e.preventDefault();
  }

  // THE COMPONENT ---------------------------------------------------------------------------------------
  return (
    <div className="habit-edit-ctn">
      <div className="habit-title-and-btns">
        <div>Edit Daily </div>

        <div>
          <button className="habit-edit cancel" onClick={closeModal}>
            Cancel
          </button>

          <button
            onClick={(e) => {
              handleSubmit(e);
              closeModal();
            }}
            className="habit-edit save"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditDailyForm;
