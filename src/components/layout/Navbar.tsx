const Navbar = () => {
  return (
    <nav className="flex items-center justify-between p-4  bg-gray-800">
      <div className="text-white font-bold">
        {/* Logo */}
        <div className="flex items-center space-x-4">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlAv6B0jrzxijQH7S0nB3HIr5kZmKFwjc_VA&s" alt="Logo" className="h-8" />
        <h1>logo</h1>

        </div>
      </div>
      <div className="flex space-x-4">
        {/* Navigation Links */}
        {/* <a href="/home" className="text-white hover:underline">
          Home
        </a> */}
        <a href="/service" className="text-white hover:underline">
          Services
        </a>
        <a href="/login" className="text-white hover:underline">
          login
        </a>
        <a href="#" className="text-white hover:underline">
          Contact
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
