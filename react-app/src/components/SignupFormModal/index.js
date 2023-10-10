import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import "./SignupForm.css";
import OnboardingModal from '../OnboardingModal'

function SignupFormModal() {
	const dispatch = useDispatch();
	const [email, setEmail] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState([]);
	const { setModalContent } = useModal();

	const handleSubmit = async (e) => {
		e.preventDefault();

		const tempErrs = {};

		if (password.length < 8 || confirmPassword.length < 8) {
			tempErrs.password = 'Password must be 8 characters or more';
			tempErrs.confirmPassword = 'Password must be 8 characters or more';
		}

		if (password !== confirmPassword) {
			tempErrs.password = 'Passwords do not match';
			tempErrs.confirmPassword = 'Passwords do not match';
		}

		if (Object.values(tempErrs).length) {
			setErrors(tempErrs);
			return;
		}

		const response = await dispatch(signUp(username, email, password, firstName, lastName));
		if (response) {
			setErrors(response);
		} else {
			setModalContent(<OnboardingModal />)
		}
	};

	return (
		<div className="signup-form-modal-container">
			<h1>Sign Up</h1>
			<form onSubmit={handleSubmit}>
				{/* <ul className="signup-form-modal-error-list">
					{errors.map((error, idx) => (
						<li key={idx}>{error}</li>
					))}
				</ul> */}
				<label className="signup-form-modal-label">
					Email
					<input
						className="signup-form-modal-input"
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</label>
				<label className="signup-form-modal-label">
					First name
					<input
						className="signup-form-modal-input"
						type="text"
						value={firstName}
						onChange={(e) => setFirstName(e.target.value)}
						required
					/>
				</label>
				<label className="signup-form-modal-label">
					Last name
					<input
						className="signup-form-modal-input"
						type="text"
						value={lastName}
						onChange={(e) => setLastName(e.target.value)}
						required
					/>
				</label>
				<label className="signup-form-modal-label">
					Username
					<input
						className="signup-form-modal-input"
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						required
					/>
				</label>
				<label className="signup-form-modal-label">
					Password
					<input
						className="signup-form-modal-input"
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</label>
				{errors.password && <div>{errors.password}</div>}
				<label className="signup-form-modal-label">
					Confirm Password
					<input
						className="signup-form-modal-input"
						type="password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						required
					/>
				</label>
				{errors.confirmPassword && <div>{errors.confirmPassword}</div>}
				<button className="signup-form-modal-button" type="submit">Sign Up</button>
			</form>
		</div>
	);
}

export default SignupFormModal;
