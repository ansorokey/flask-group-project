import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { authenticate } from "./store/session";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import Navigation from "./components/Navigation";
import Dashboard from "./components/Dashboard"
import LandingPage from "./components/LandingPage";
import { HabitProvider } from "./context/Habit";
import {Link} from "react-router-dom"
import Footer from "./components/Footer";

function App() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/">
            {sessionUser ?
              <HabitProvider>
                <Dashboard />
              </HabitProvider>

              : <LandingPage />}
          </Route>
          <Route path="*">
            <div className="lost-page">
              <h1 className="lost-h1">You seem a lttle lost!</h1>
              <Link className="lost-home" to="/"> ⬅️ Return Home</Link>
              <img src="https://res.cloudinary.com/dzntryr5a/image/upload/v1694128274/pngegg_vvqi5o.png" alt="Confused Spinda" />
            </div>
          </Route>
        </Switch>
      )}
      <Footer />
    </>
  );
}

export default App;
