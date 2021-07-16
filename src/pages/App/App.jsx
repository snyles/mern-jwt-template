import { useState } from "react";
import { Route, useHistory, Switch } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import Signup from "../Signup/Signup";
import Login from "../Login/Login";
import Users from '../Users/Users'
import authService from "../../services/authService"
import { UserContext } from '../../lib/UserContext'
import ProtectedRoute from "../../components/ProtectedRoute";

export default function App (props) {
  const [user, setUser] = useState(authService.getUser())
  const history = useHistory();

  const handleLogout = () => {
    authService.logout();
    setUser(null)
    history.push("/");
  }

  const handleSignupOrLogin = () => {
    setUser(authService.getUser());
  }

  return (
    <>
      <UserContext.Provider value={user}>
        <NavBar handleLogout={handleLogout} />
        <Switch>
          <Route
            path="/signup"
            render={() => (
              <Signup
              handleSignupOrLogin={handleSignupOrLogin}
              />
              )}
          />
          <Route
            path="/login"
            render={() => (
              <Login
              handleSignupOrLogin={handleSignupOrLogin}
              />
              )}
          />
          <ProtectedRoute path='/users'>
              <Users />
          </ProtectedRoute>
          <Route
            path="/"
            render={() => (
              <main>
                <h1>Welcome. This is an authorization template.</h1>
              </main>
            )}
          />
        </Switch>
      </UserContext.Provider>
    </>
  );
}

