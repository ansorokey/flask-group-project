import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { authenticate } from "./store/session";
// Component Imports
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import Navigation from "./components/Navigation";
import Dashboard from "./components/Dashboard"
import LandingPage from "./components/LandingPage";
import { HabitProvider } from "./context/Habit";
import OnboardingModal from "./components/OnboardingModal";

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
          <Route path="/test" >
            <OnboardingModal />
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
          <Route>
            <div className="lost-page">
              <h1 className="lost-h1">Feature coming at a less dizzy time!</h1>
              <img src="https://res.cloudinary.com/dzntryr5a/image/upload/v1694128274/pngegg_vvqi5o.png" />
            </div>
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
