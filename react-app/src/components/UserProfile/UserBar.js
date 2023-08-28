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
                ></div>
                <div className="user-stats">
                    <div>{user.username}</div>
                    <div>{user.email}</div>
                </div>
            </div>
        </div>
    );
}

export default UserBar;
