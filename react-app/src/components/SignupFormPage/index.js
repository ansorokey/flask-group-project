import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { signUp } from "../../store/session";
import './SignupForm.css';
import OnboardingModal from "../OnboardingModal";
import { useModal } from "../../context/Modal";

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { setModalContent } = useModal();

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const tempErrs = {};

		if (password.length < 8 || confirmPassword.length < 8) {
			tempErrs.password = 'Password must be 8 characters or more';
		}

		if (password !== confirmPassword) {
			tempErrs.password = 'Passwords do not match';
		}

		if (Object.values(tempErrs).length) {
			setErrors(tempErrs);
			return;
		}

    const response = await dispatch(signUp(username, email, password, firstName, lastName));
    if (response) {
      const errs = {}
      response.forEach(e => {
        const keyMessage = e.split(':');
        errs[keyMessage[0].trim()] = keyMessage[1].trim();
      });
      setErrors(errs);
    } else {
      setModalContent(<OnboardingModal />)
    }
  };

  return (
    <div className="signup-page">
      <h2 className="ct">Sign Up For Free</h2>
      <p>Username must be 1 to 20 characters, containing only letters a to z, numbers 0 to 9, hyphens, or underscores, and cannot include any inappropriate terms.</p>
      <form onSubmit={handleSubmit} className="signup-page-form">

        <div className="form-input-ctn">
          <input
            placeholder="Email"
            className="signup-input"span
            type="email"
            value={email}
            onChange={(e) => {setEmail(e.target.value); setErrors(prev => {delete prev.email; return {...prev}});}}
            required
          />
          {errors.email && <span className="val-err-div" >{errors.email}</span>}
        </div>

        <div className="form-input-ctn" >
          <input
            placeholder="First Name"
            className="signup-input"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>

        <div className="form-input-ctn" >
          <input
            placeholder="Last Name"
            className="signup-input"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>

        <div className="form-input-ctn" >
          <input
            placeholder="Username"
            className="signup-input"
            type="text"
            value={username}
            onChange={(e) => {setUsername(e.target.value); setErrors(prev => {delete prev.username; return {...prev}});}}
            required
          />
          {errors.username && <span className="val-err-div" >{errors.username}</span>}
        </div>

        <div className="form-input-ctn" >
          <input
            placeholder="Password"
            className="signup-input"
            type="password"
            value={password}
            onChange={(e) => {setPassword(e.target.value); setErrors(prev => {delete prev.password; return {...prev}});}}
            required
          />
          {errors.password && <span className="val-err-div" >{errors.password}</span>}
        </div>

        <div className="form-input-ctn" >
          <input
            placeholder="Confirm Password"
            className="signup-input"
            type="password"
            value={confirmPassword}
            onChange={(e) => {setConfirmPassword(e.target.value); setErrors(prev => {delete prev.password; return {...prev}});}}
            required
          />
          {errors.password && <span className="val-err-div" >{errors.password}</span>}
        </div>

        <button className="signup-button" type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignupFormPage;
