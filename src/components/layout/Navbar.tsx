import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, useCurrentUser } from "@/features/auth/authSlice";
import { ModeToggle } from "../mode-toggle";
import { FaCar } from "react-icons/fa";
// import image from '../../assets/vi.svg'
const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(useCurrentUser);

  const handleLogout = () => {
    dispatch(logout()); 
    navigate("/login"); 
  };

  return (
    <div className="navbar border-b-2  bg-sky-800 dark:text-white text-white  shadow-md">
      {/* Left Side - Logo & Dropdown */}
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          {/* Mobile Dropdown Menu */}
          <ul
            tabIndex={0}
            className="bg-slate-200 menu z-50 menu-sm dropdown-content  rounded-box] mt-3 w-52 p-2 shadow"
          >
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/dashboard">Dashboard</NavLink>
            </li>
            <li>
            <NavLink to="/about">About Us</NavLink>
          </li>
            {user ? (
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            ) : (
              <li>
                <NavLink to="/login">Login</NavLink>
              </li>
            )}
          </ul>
        </div>
        {/* Logo */}
        <NavLink to="/" className="btn btn-ghost text-xl">
          {/* <img
            src={image}
            alt="Logo"
            className="h-8"
          /> */}
            <FaCar className="text-4xl" />
       <h1 className="font-semibold"> CarStore</h1>
        </NavLink>
      </div>

      {/* Center - Links */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
     
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
      
          <li>
            <NavLink to="/about">About Us</NavLink>
          </li>
          <li>
        
          </li>
        </ul>
      </div>

      {/* Right Side - Login/Logout & Dark Mode Toggle */}
      <div className="navbar-end flex items-center gap-4">
      <button>
            <NavLink to="/dashboard">Dashboard</NavLink>
          </button>
        {user ? (
          <button className="btn btn-error btn-sm text-white" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <NavLink to="/login" className="btn btn-primary btn-sm text-white">
            Login
          </NavLink>
        )}
        <ModeToggle />
      </div>
    </div>
  );
};

export default Navbar;
