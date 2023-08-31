import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStarterAvatars } from "../../store/avatar";
import { useModal } from "../../context/Modal";
import { updateUserInfo } from "../../store/session";


function OnboardingModal() {
    const { closeModal } = useModal();
    const [avatarId, setAvatarId] = useState(0);
    const [about, setAbout] = useState('');
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user)
    const avatar_state = useSelector(state => state.avatar);
    const avatar_arr = Object.values(avatar_state);
    const [activePage, setActivePage] = useState('avatar');

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
            about
        }

        if(avatarId > 0) data['avatarUrl'] = avatar_state[avatarId].url

        const response = await dispatch(updateUserInfo(data));
        if(response.ok) {
            closeModal();
        }

    }


    // ----------------------------------------------------------------------------------------
    // THE COMPONENT
    // ----------------------------------------------------------------------------------------
    return <div className="choose-avatar-ctn">

        <form onSubmit={handleSubmit}>
            {activePage === 'avatar' && <div>
                <h1>Welcome to LevelUp!</h1>
                <h2>Start by picking out your new Avatar</h2>
                <p>(Don't worry, you can change this later)</p>
                <div className="edit-user-avatar-ctn">
                    {avatar_arr.map(av => {
                        return (<label key={av.id} className="avatar-radio-ctn">
                            <img src={av.url} alt="user avatar"/>
                            <input type="radio" name="avatar" value={+av.id} checked={+avatarId === +av.id} onChange={(e) => {setAvatarId(+e.target.value)}} />
                        </label>);
                    })}
                </div>
            </div>}

            {activePage === 'about' && <div>
                <h1>Now tell us a little about yourself!</h1>
                <textarea
                    value={about}
                    onChange={e => setAbout(e.target.value)}
                />
            </div>}

            <button
                onClick={(e) => {
                    e.preventDefault();
                    setActivePage('avatar')}
                }
                disabled={activePage === 'avatar'}
            >
                Back
            </button>

            <button>Save</button>

            <button
                onClick={(e) => {
                    e.preventDefault();
                    setActivePage('about')}
                }
                disabled={activePage === 'about'}
            >
                Next
            </button>
        </form>
    </div>
}

export default OnboardingModal;
