import React, { useEffect, useState } from "react";
import { getAllUsers } from "../../services/userService";

export default function Users (props) {
  const [users, setUsers] = useState([]);
  
  useEffect(() => {
    (async function () {
      const users = await getAllUsers();
      setUsers(users)
    })();
  },[]);

  if (!users) return <p>Loading...</p>
  return (
    <>
      <h1>Hello. This is a list of all the users.</h1>
      {users.map((user) => (
        <p key={user._id}>{user.name} </p>
      ))}
    </>
  );
}
