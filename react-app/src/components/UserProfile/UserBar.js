import { useModal } from '../../context/Modal';
import UserProfileModal from './UserProfileModal';
import './user-profile.css';

function UserBar({user}) {
    const { setModalContent } = useModal();

    return (
        <div className="user-bar">
            <div className="user-info">
                <div className="user-avatar-ctn"
                    onClick={() => setModalContent(<UserProfileModal user={user} />)}
                >
                    <img className="user-bar-avatar" src={user.avatarUrl} alt="user avatar"/>
                </div>
                <div className="user-stats">
                    <i className="fa-solid fa-hat-wizard"></i>
                    <div>
                        <div>{user.firstName} {user.lastName}</div>
                        <div>{user.email}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserBar;
