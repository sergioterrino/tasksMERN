import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext";

function Navbar() {

  const { isAuthenticated, user, logout } = useAuth();

  return (
    <nav className="bg-zinc-700 my-3 flex justify-between py-5 px-10 rounded-lg">
      <Link to={isAuthenticated ? '/tasks' : '/'}>
        <h1 className="text-2xl font-bold z-50">Tasks Manager</h1>
      </Link>
      <ul className="flex gap-x-2">
        {isAuthenticated ? (
          <>
            <li className="flex justify-center items-center">
              <Link to="/add-task" className="bg-indigo-500 px-2 py-1 rounded-md font-bold m-3">Add Task</Link>
              <Link to="/" onClick={logout} className="text-indigo-500 bg-white font-bold px-2 py-1 rounded-md">Logout</Link>
              <h1 className="ml-4">{user.username}</h1>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login" className="bg-indigo-500 px-2 py-1 rounded-md font-bold m-3">Login</Link>
              <Link to="/signup" className="text-indigo-500 bg-white font-bold px-2 py-1 rounded-md">Signup</Link>
            </li>
          </>
        )
        }
      </ul >
    </nav >
  )
}

export default Navbar