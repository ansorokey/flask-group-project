import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUserInfo } from "../../store/session";

function UserProfileModal({editOpen=false}) {
    const user = useSelector(state => state.session.user)

    // const lastLogin = new Date(user.lastLogin);
    // const joined = new Date(user.joined);
    const [activeTab, setActiveTab] = useState('Profile');
    const [edit, setEdit] = useState(editOpen);
    const [avatarId, setAvatarId] = useState(0);
    const [about, setAbout] = useState(user.about);
    const [changeAvatar, setChangeAvatar] = useState(false);
    const avatar_state = useSelector(state => state.avatar);
    const availableAvatars = Object.values(avatar_state);
    const dispatch = useDispatch();

    async function handleSubmit(e) {
        e.preventDefault();

        const data = {
            userId: user.id,
            about
        }

        if(avatarId > 0) data['avatarUrl'] = avatar_state[avatarId].url

        // console.log(data);
        // dispatch the data as a thunk
        const response = await dispatch(updateUserInfo(data));
        if(response.ok) {
            setEdit(false);
            setChangeAvatar(false);
        }
    }

    // THE COMPONENT ---------------------------------------------------------------------------------
    return (
        <div className="profile-modal-ctn">
            <div className="user-profile-top">
                <img className="avatar-img" src={user.avatarUrl} alt='user avatar' />
                <div className="health-and-level">
                    <div>@{user.username} | Level 1</div>
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
                <div className={activeTab === 'Profile' ? 'active' : null} onClick={() => setActiveTab('Profile')}>Profile</div>
                <div className={activeTab === 'Stats' ? 'active' : null} onClick={() => setActiveTab('Stats')}>Stats</div>
                <div className={activeTab === 'Achievements' ? 'active' : null} onClick={() => setActiveTab('Achievements')}>Achievements</div>
            </div>

            {activeTab === 'Profile' && <div>
                <div className='name-and-edit'>
                    <div>
                        <h2>{user.firstName} {user.lastName}</h2>
                        <div>@{user.username}</div>
                    </div>

                    <div className="edit-prof" onClick={() => setEdit(!edit)}>Edit</div>
                </div>

                {!edit && <div className="user-about">
                    <div className="user-about-about">
                        <h2>About</h2>
                        <hr />
                        {user.about ? <div>{user.about}</div> : <div>This user hasn't added a description.</div>}
                    </div>

                    <div className="user-profile-info-ctn">
                        <h2>Info</h2>
                        <hr />
                        <div className="user-profile-info">
                            <span><div>Joined:</div> <div>{user.joined.slice(5, 16)}</div></span>
                            <span><div>Total Check-ins:</div> <div>{user?.checkIns}</div></span>
                            <span><div>Last Check In:</div> <div>{user.lastLogin.slice(5, 16)}</div></span>
                        </div>
                    </div>
                </div>}

                {edit && <div>
                    <form className="edit-user-prof" onSubmit={handleSubmit}>
                        <div className="edit-prof-sec">
                            <label>About</label>
                            <textarea value={about} onChange={(e) => setAbout(e.target.value) } />
                        </div>

                        <div onClick={() => setChangeAvatar(!changeAvatar)}>
                            Change Avatar  {changeAvatar ? <i className="fa-solid fa-caret-up"></i> :<i className="fa-solid fa-caret-down"></i>}
                        </div>
                        {changeAvatar && <div className="edit-user-avatar-ctn">
                            {availableAvatars.map(av => {
                                return (<label key={av.id} className="avatar-radio-ctn">
                                    <img src={av.url} alt="user avatar"/>
                                    <input type="radio" name="avatar" value={+av.id} checked={+avatarId === +av.id} onChange={(e) => {setAvatarId(+e.target.value)}} />
                                </label>);
                            })}
                        </div>}

                        <button>Save</button>
                    </form>
                </div>}

            </div>}

            {activeTab === 'Stats' && <div>
                <h1>Feature Coming Soon!</h1>
            </div>}

            {activeTab === 'Achievements' && <div>
                <h1>Feature Coming Soon!</h1>
            </div>}

        </div>
    )
}

export default UserProfileModal;
