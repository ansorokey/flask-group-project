import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUserInfo } from "../../store/session";
import { useModal } from "../../context/Modal";

function AboutUserModal() {
    const { closeModal } = useModal();
    const user = useSelector(state => state.session.user);
    const [about, setAbout] = useState('');
    const dispatch = useDispatch();

    async function handleSubmit(e){
        e.preventDefault();

        const data = {
            userId: +user.id,
            about
        }

        const response = await dispatch(updateUserInfo(data));
        if(response.ok) {
            closeModal();
        }

    }

    // THE COMPONENT -------------------------------------------------------------------------------------
    return <div className="about-user-modal-ctn">
        <form onSubmit={handleSubmit}>
            <h1>Now tell us a little about yourself!</h1>
            <textarea
                value={about}
                onChange={e => setAbout(e.target.value)}
            />
            <button>Submit</button>
        </form>

    </div>
}

export default AboutUserModal;
