import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";

function DeleteDailyModal() {
  const { closeModal } = useModal();
  const dispatch = useDispatch();

  return (
    <div>
      <h1> Are you sure you want to delete this Daily? </h1>
      {/* <p><em>{title}</em></p> */}

      <button
        onClick={async () => {
          closeModal();
        }}
      >
        Yes
      </button>

      <button
        onClick={() => {
          closeModal();
        }}
      >
        No
      </button>
    </div>
  );
}

export default DeleteDailyModal;
