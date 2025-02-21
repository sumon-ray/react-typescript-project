import { NavLink } from "react-router-dom";
import { ModeToggle } from "../mode-toggle";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between p-4  bg-gray-800">
      <div className="text-white font-bold">
        {/* Logo */}
        <div className="flex items-center space-x-4">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlAv6B0jrzxijQH7S0nB3HIr5kZmKFwjc_VA&s"
            alt="Logo"
            className="h-8"
          />
          <NavLink to={'/'}>
            <h1> Home</h1>
          </NavLink>
        
        </div>
      </div>
      <div className="flex space-x-4">
        {/* Navigation Links */}
        {/* <a href="/home" className="text-white hover:underline">
          Home
        </a> */}
        <NavLink to="/dashboard" className="text-white hover:underline">
         Dashboard
        </NavLink>
     
        <NavLink to="/login" className="text-white hover:underline">
          login
        </NavLink>
        {/* <NavLink to="/create" className="text-white hover:underline">
          create
        </NavLink> */}
     
        <ModeToggle />
      </div>
    </nav>
  );
};

export default Navbar;
