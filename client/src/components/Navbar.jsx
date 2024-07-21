import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext";

function Navbar() {

  const { isAuthenticated, user, logout } = useAuth();

  return (
    <nav className="bg-zinc-700 flex flex-col gap-y-3 sm:flex-row items-center justify-between my-3 px-10 py-3 rounded-lg">
      <Link to={isAuthenticated ? '/tasks' : '/'}>
        <h1 className="text-2xl font-bold z-50">Tasks Manager</h1>
      </Link>
      <ul className="flex flex-row justify-center items-center gap-2">
        {isAuthenticated ? (
          <>
            <li>
              <Link to="/add-task" className="bg-indigo-500 px-2 py-1 rounded-md font-bold">Add Task</Link>
            </li>
            <li>
              <Link to="/" onClick={logout} className="text-indigo-500 bg-white font-bold px-2 py-1 rounded-md">Logout</Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login" className="bg-indigo-500 px-2 py-1 rounded-md font-bold">Login</Link>
            </li>
            <li>
              <Link to="/signup" className="text-indigo-500 bg-white font-bold px-2 py-1 rounded-md">Signup</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar