import { FaCar, FaInfoCircle, FaPhone, FaUsers } from "react-icons/fa";

const About = () => {
  return (
    <div className="bg-gray-100 p-10 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-500 opacity-30"></div>
      <h1 className="text-6xl font-extrabold text-center mb-8 text-gray-900 drop-shadow-lg">
        Welcome to CarStore
      </h1>
      <p className="text-xl text-center mb-6 text-gray-800">
        Your trusted partner in buying and selling cars online.
      </p>

      <div className="mt-10 text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Values</h2>
        <p className="text-lg text-gray-700 mb-4">
          At CarStore, we believe in transparency, quality, and customer
          satisfaction. Our mission is to provide a seamless car buying and
          selling experience.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-10">
        <div className="bg-white p-8 rounded-lg shadow-xl text-center transform transition-transform hover:scale-110">
          <FaCar className="text-green-600 text-7xl mb-4 animate-bounce" />
          <h3 className="text-2xl font-bold">Wide Selection</h3>
          <p>
            Choose from a vast array of vehicles to find your perfect match.
          </p>
        </div>
        <div className="bg-white p-8 rounded-lg shadow-xl text-center transform transition-transform hover:scale-110">
          <FaInfoCircle className="text-green-600 text-7xl mb-4 animate-bounce" />
          <h3 className="text-2xl font-bold">Detailed Listings</h3>
          <p>
            Access comprehensive details and specifications for each vehicle.
          </p>
        </div>
        <div className="bg-white p-8 rounded-lg shadow-xl text-center transform transition-transform hover:scale-110">
          <FaPhone className="text-green-600 text-7xl mb-4 animate-bounce" />
          <h3 className="text-2xl font-bold">24/7 Support</h3>
          <p>Our dedicated team is here to assist you anytime, day or night.</p>
        </div>
        <div className="bg-white p-8 rounded-lg shadow-xl text-center transform transition-transform hover:scale-110">
          <FaUsers className="text-green-600 text-7xl mb-4 animate-bounce" />
          <h3 className="text-2xl font-bold">Community Focused</h3>
          <p>Join a community of car enthusiasts and share your experiences.</p>
        </div>
      </div>

      <div className="mt-10 text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-6">
          Customer Testimonials
        </h2>
        <div className="flex flex-col md:flex-row justify-center gap-8">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <p className="text-gray-600 italic">
              "CarStore made my car buying experience so easy and enjoyable!"
            </p>
            <p className="mt-4 font-bold">- Alex R.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <p className="text-gray-600 italic">
              "I sold my car quickly and at a great price. Highly recommend!"
            </p>
            <p className="mt-4 font-bold">- Jamie L.</p>
          </div>
        </div>
      </div>

      <div className="mt-10 text-center">
        <h2 className="text-4xl font-bold text-gray-900">Get Started Today!</h2>
        <p className="mt-3 text-gray-700">
          Sign up now to explore our extensive inventory and find your dream
          car!
        </p>
      </div>
    </div>
  );
};

export default About;
