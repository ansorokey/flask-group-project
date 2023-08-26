import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);

	return (
		<div className='nav-bar'>
			{/* <div hidden="true">Menu</div> */}

			<div className='nav-links-ctn'>
			<NavLink exact to="/" className="nav-home">LevelUp!</NavLink>
				<NavLink className="nav-links" exact to="/">Tasks</NavLink>
				<NavLink className="nav-links" exact to="/inventory">Inventory</NavLink>
				<NavLink className="nav-links" exact to="/shops">Shops</NavLink>
				<NavLink className="nav-links" exact to="/party">Party</NavLink>
				<NavLink className="nav-links" exact to="/groups">Group</NavLink>
				<NavLink className="nav-links" exact to="/challenges">Challenges</NavLink>
				<NavLink className="nav-links" exact to="/help">Help</NavLink>
			</div>

			{isLoaded && <ProfileButton user={sessionUser} />}
		</div>
	);
}

export default Navigation;
