import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStarterAvatars } from "../../store/avatar";
import AboutUserModal from "./AboutUserModal";
import { useModal } from "../../context/Modal";
import { updateUserInfo } from "../../store/session";


function ChooseAvatarModal() {
    const { setModalContent } = useModal();
    const [avatarId, setAvatarId] = useState(1);
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user)
    const avatar_state = useSelector(state => state.avatar);
    const avatar_arr = Object.values(avatar_state);

    useEffect(() => {
        async function initLoad() {
            await dispatch(getStarterAvatars());
        }

        initLoad();
    }, [dispatch]);

    async function handleSubmit(e) {
        e.preventDefault();

        const data = {
            userId: +user.id,
        }

        if(avatarId > 0) data['avatarUrl'] = avatar_state[avatarId].url

        const response = await dispatch(updateUserInfo(data));
        if(response.ok) {
            setModalContent(<AboutUserModal />);
        }

    }

    return <div className="choose-avatar-ctn">
        <h1>Welcome to LevelUp!</h1>
        <h2>Start by picking out your new Avatar</h2>
        <p>(Don't worry, you can change this later)</p>

        <form>
            {/* <div className="radio-buttons">
                {avatar_arr.map(av => {
                    return (<label key={av.id}>
                        <img src={av.url} alt="user avatar"/>
                        <input type="radio" name="avatar" value={av.id} checked={avatarId === av.id} onChange={(e) => {setAvatarId(e.target.value)}} />
                    </label>);
                })}
            </div> */}

            <div className="edit-user-avatar-ctn">
                {avatar_arr.map(av => {
                    return (<label key={av.id} className="avatar-radio-ctn">
                        <img src={av.url} alt="user avatar"/>
                        <input type="radio" name="avatar" value={+av.id} checked={+avatarId === +av.id} onChange={(e) => {setAvatarId(+e.target.value)}} />
                    </label>);
                })}
            </div>

            <button onClick={handleSubmit}>Select</button>
        </form>
    </div>
}

export default ChooseAvatarModal;
