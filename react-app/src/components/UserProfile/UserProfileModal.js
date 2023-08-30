import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUserInfo } from "../../store/session";

function UserProfileModal() {
    const user = useSelector(state => state.session.user)

    const lastLogin = new Date(user.lastLogin);
    const [activeTab, setActiveTab] = useState('Profile');
    const [edit, setEdit] = useState(false);
    const [avatarId, setAvatarId] = useState(1);
    const [about, setAbout] = useState(user.about);
    const [changeAvatar, setChangeAvatar] = useState(false);
    const avatar_state = useSelector(state => state.avatar);
    const availableAvatars = Object.values(avatar_state);
    const dispatch = useDispatch();

    async function handleSubmit(e) {
        e.preventDefault();

        const data = {
            userId: user.id,
            avatarUrl: avatar_state[avatarId].url || user.avatarUrl,
            about
        }

        // console.log(data);
        // dispatch the data as a thunk
        const response = await dispatch(updateUserInfo(data));
        if(response.ok) {
            setEdit(false);
        }
    }

    return (
        <div className="profile-modal-ctn">
            <div className="user-profile-top">
                <img className="avatar-img" src={user.avatarUrl} />
                <div className="health-and-level">
                    <div>@{user.username} | Level LEVEL</div>
                    <div className="stat-bar">
                        <i className="fa-solid fa-heart"></i>
                        <div className="max-stat-bar">
                            <div className="health-bar"></div>
                        </div>
                        <span>50/50</span>
                    </div>
                    <div className="stat-bar">
                        <i className="fa-solid fa-star"></i>
                        <div className="max-stat-bar">
                            <div className="exp-bar"></div>
                        </div>
                        <span>30/100</span>
                    </div>
                </div>
            </div>

            <div className="user-profile-links">
                <div className={activeTab == 'Profile' ? 'active' : null} onClick={() => setActiveTab('Profile')}>Profile</div>
                <div className={activeTab == 'Stats' ? 'active' : null} onClick={() => setActiveTab('Stats')}>Stats</div>
                <div className={activeTab == 'Achievements' ? 'active' : null} onClick={() => setActiveTab('Achievements')}>Achievements</div>
            </div>

            {activeTab == 'Profile' && <div>
                <div className='name-and-edit'>
                    <div>
                        <h2>{user.firstName} {user.lastName}</h2>
                        <div>@{user.username}</div>
                    </div>

                    <div className="edit-prof" onClick={() => setEdit(!edit)}>Edit</div>
                </div>

                {!edit && <div>
                    <div>About</div>

                    <div className="user-profile-info-ctn">
                        <div>Info</div>
                        <hr />
                        <div className="user-profile-info">
                            <div>Joined DATE</div>
                            <div>Total Check-ins INT</div>
                            <div>Last Check In {lastLogin.getMonth() + 1}-{lastLogin.getDate()}-{lastLogin.getFullYear()}</div>
                        </div>
                    </div>
                </div>}

                {edit && <div>
                    <form onSubmit={handleSubmit}>
                        <label>
                            About
                            <textarea value={about} onChange={(e) => setAbout(e.target.value) } />
                        </label>

                        <label>
                            <span onClick={() => setChangeAvatar(!changeAvatar)}>Change Avatar</span>
                            {changeAvatar && <div>
                                {availableAvatars.map(av => {
                                    return (<label key={av.id}>
                                        <img src={av.url} alt="pokemon profile picture"/>
                                        <input type="radio" name="avatar" value={av.id} checked={avatarId == av.id} onChange={(e) => {setAvatarId(e.target.value)}} />
                                    </label>);
                                })}
                            </div>}
                        </label>

                        <button>Save</button>
                    </form>
                </div>}

            </div>}

            {activeTab == 'Profile' && <div>

            </div>}

            {activeTab == 'Profile' && <div>

            </div>}

        </div>
    )
}

export default UserProfileModal;
