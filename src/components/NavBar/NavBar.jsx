import { useContext } from 'react';
import { NavLink } from "react-router-dom";
import { UserContext } from '../../lib/UserContext';

export default function NavBar ({ handleLogout }) {
  const user = useContext(UserContext)
  return (
    <nav>
      <ul>
      {user ?
        <>
          <li>Welcome, {user.name}</li>
          <li><NavLink to="" onClick={handleLogout}>Log Out</NavLink></li>
          <li><NavLink to="/users">Users</NavLink></li>
        </>
      :
        <>
          <li><NavLink to="/login">Log In</NavLink></li>
          <li><NavLink to="/signup">Sign Up</NavLink></li>
        </>
      }
      </ul>
    </nav>
  )
}

