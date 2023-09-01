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
import OnboardingModal from "./components/OnboardingModal";
import { HabitProvider } from "./context/Habit";

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
          <Route>
            <OnboardingModal />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
