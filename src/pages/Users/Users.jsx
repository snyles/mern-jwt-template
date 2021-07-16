import { useEffect, useState } from "react";
import { getAllUsers } from "../../services/userService";

export default function Users () {
  const [users, setUsers] = useState([]);
  
  useEffect(() => {
    (async function () {
      setUsers(await getAllUsers())
    })();
  },[]);

  if (!users) return <p>Loading...</p>
  return (
    <main>
      <h1>Hello. This is a list of all the users.</h1>
      {users.map((user) => (
        <p key={user._id}>{user.name}, {user.email} </p>
      ))}
    </main>
  );
}
