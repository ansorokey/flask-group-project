function UserProfileModal({user}) {
    return (
        <div className="profile-modal-ctn">
            <img className="avatar-img" src="https://mir-s3-cdn-cf.behance.net/project_modules/1400/10f13510774061.560eadfde5b61.png" />
            <div>@{user.username}</div>
            <div>
                <div>Profile</div>
                <div>Stats</div>
                <div>Achievements</div>
            </div>
            <div>{user.username}</div>
            <div>Edit</div>
            <div>About</div>
            <div>Info</div>
        </div>
    )
}

export default UserProfileModal;
