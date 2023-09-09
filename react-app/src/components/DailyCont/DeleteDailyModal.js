import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import { removeDaily, loadAllDailies } from "../../store/daily";
import "./daily.css"


function DeleteDailyModal({daily}) {
  const { closeModal } = useModal();
  const dispatch = useDispatch();

  return (
    <div className="deleteDailyModal">
      <h1> Are you sure you want to delete this Daily? </h1>
      <p><em>{daily.title}</em></p>

      <div className="deletedailybuttoncont">
        <div
          className="dailyDeleteButton"
          onClick={async () => {
            dispatch(removeDaily(daily.id))
            dispatch(loadAllDailies())
            closeModal();
          }}
        >
          Yes
        </div>



        <div
          className="dailyDeleteButton"
          onClick={() => {
            closeModal();
          }}
        >
          No
        </div>
      </div>
    </div>
  );
}

export default DeleteDailyModal;
