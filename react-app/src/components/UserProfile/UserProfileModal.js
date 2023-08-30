function UserProfileModal({user}) {

    const lastLogin = new Date(user.lastLogin);

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
                <div className="active">Profile</div>
                <div>Stats</div>
                <div>Achievements</div>
            </div>
            <div>{user.username}</div>
            <div>Edit</div>
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
        </div>
    )
}

export default UserProfileModal;
