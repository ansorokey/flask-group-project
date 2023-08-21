import { useContext } from 'react';
import { useModal } from '../../context/Modal';
import { useDispatch } from 'react-redux';
import { deleteHabit } from "../../store/habits";

function DeleteHabitModal({habit}) {
    const { closeModal } = useModal();
    const dispatch = useDispatch();

    return <div>
        <h1> Are you sure you want to delete this habit? </h1>
        <p><em>{habit.title}</em></p>

        <button
            onClick={async () => {
                dispatch(deleteHabit(habit.id));
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
}

export default DeleteHabitModal;
