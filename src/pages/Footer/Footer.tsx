import { FaFacebookSquare } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { FaLinkedin } from "react-icons/fa";
import { FaTwitterSquare } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa6";
import { FaInstagramSquare } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { FaWhatsapp } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";
import "./footer.css";
const Footer = () => {
  return (
    <>
      <div className=" bg-sky-800 text-gray-100 pt-[150px] footers">
        <div className="container mx-auto px-[10px] py-[50px]">
          <div>
            <div className="lg:flex justify-between items-center mb-[20px]">
              <div>
                <h5 className="text-[30px] text-white">CarStore</h5>
              </div>
              <div className="flex items-center gap-[30px] text-[30px] text-gray-100">
                <NavLink to="">
                  <FaFacebookSquare />
                </NavLink>
                <NavLink to="">
                  <FaLinkedin />
                </NavLink>
                <NavLink to="">
                  <FaTwitterSquare />
                </NavLink>
                <NavLink to="">
                  <FaYoutube />
                </NavLink>
                <NavLink to="">
                  <FaInstagramSquare />
                </NavLink>
              </div>
            </div>
            <div className=" lg:flex justify-between items-center">
              <div>
                <h5 className="text-gray-200">Quick Link</h5>
                <ul className="grid grid-cols-2 gap-[20px] mt-[20px]">
                  <li>
                    <NavLink to="">Home</NavLink>
                  </li>
                  <li>
                    <NavLink to="">About</NavLink>
                  </li>
                  <li>
                    <NavLink to="">FAQ</NavLink>
                  </li>
                  <li>
                    <NavLink to="">Contact</NavLink>
                  </li>
                </ul>
              </div>
              <div>
                <h2 className="text-gray-200">Contact us</h2>
                <div className="mt-[20px] space-y-5">
                  <p className="flex gap-[25px] items-center">
                    <FaLocationDot />
                    <span> Tangail zila, Dhaka Bangladesh</span>
                  </p>
                  <p className="flex gap-[25px] items-center">
                    <FaWhatsapp />
                    <span> +2647829374</span>
                  </p>
                  <p className="flex gap-[25px] items-center">
                    <MdOutlineMail />
                    <span> sumonray146371@gmail.com</span>
                  </p>
                </div>
              </div>
              <div>
                <h5 className="text-gray-200 mb-[20px]">Remain Update</h5>
                <div>
                  <input
                    className="w-full bg-white text-gray-700 focus:outline-none p-[10px]"
                    placeholder="Email"
                    type="email"
                  />
                  <button className="py-[8px] px-[40px] border mt-[10px] border-white text-white hover:bg-white hover:text-black">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
            <hr className="border-1 mt-[20px] border-white" />
            <div className="mt-[20px] lg:flex justify-between items-center">
              <p>&copy;copy 2025 all right reserved</p>
              <p>Designed By Sumon Ray</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
