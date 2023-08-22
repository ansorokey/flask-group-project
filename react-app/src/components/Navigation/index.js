import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);

	return (
		<div className='nav-bar'>
			<div>Menu</div>

			<NavLink exact to="/" className="nav-home">Home</NavLink>

			{isLoaded && <ProfileButton user={sessionUser} />}
		</div>
	);
}

export default Navigation;
