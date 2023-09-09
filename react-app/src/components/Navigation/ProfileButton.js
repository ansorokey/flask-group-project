import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import UserProfileModal from "../UserProfile/UserProfileModal";
import { useModal } from "../../context/Modal";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const { setModalContent } = useModal();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const handleLogout = (e) => {
    closeMenu();
    e.preventDefault();
    dispatch(logout());
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <>
      {user ? (
        <div onClick={openMenu} className="userButton">
          <i className="fa-regular fa-user"></i>
        </div>
      ) : (
        <div
          onClick={() => setModalContent(<LoginFormModal />)}
          className="landingButton"
        >
          Login
        </div>
      )}

      <div className={ulClassName} ref={ulRef}>
        <div className="userMenuItem">Edit Avatar</div>
        <hr />
        <div
          className="userMenuItem"
          onClick={() => setModalContent(<UserProfileModal user={user} />)}
        >
          Profile
        </div>
        <hr />
        <div className="userMenuItem" onClick={handleLogout}>
          Log Out
        </div>
      </div>
    </>
  );
}

export default ProfileButton;
