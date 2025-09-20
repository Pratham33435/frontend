import { useState, useRef, useEffect } from "react";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";
import { HiHome } from "react-icons/hi";
import { FiBookOpen } from "react-icons/fi";
import { LuLayers } from "react-icons/lu";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { LuMail } from "react-icons/lu";

export default function Toggle() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const menuRef = useRef(null);
const toggleRef = useRef(null);

  const isHome = location.pathname === "/";

  useEffect(() => {
  function handleClickOutside(event) {
    if (
      menuRef.current &&
      !menuRef.current.contains(event.target) &&
      toggleRef.current &&
      !toggleRef.current.contains(event.target)
    ) {
      setIsOpen(false);
    }
  }

  document.addEventListener("mousedown", handleClickOutside);
  document.addEventListener("touchstart", handleClickOutside);

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
    document.removeEventListener("touchstart", handleClickOutside);
  };
}, []);


  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50  
        ${isHome ? "bg-white/10 border-white/20" : "bg-black/80 border-gray-700 opacity-50"}`}
    >
      <div className="max-w-5xl mx-auto px-6 py-3 flex justify-between items-center">
        
        {/* Left Section → Back button (hidden on Home) */}
        <div className="flex items-center gap-4">
          {!isHome && (
            <button
              onClick={() => navigate(-1)}
              className="text-white  px-3 py-1 rounded-lg text-xl shadow-md transition"
            >
              <IoMdArrowBack />
            </button>
          )}
          <div className="text-white text-2xl font-bold tracking-wide"><img src="/logo-1.png" alt="logo"  className="w-20 rounded-xl"/></div>
        </div>

        {/* Desktop Nav */}
        <ul className="hidden md:flex gap-8 text-white font-medium">
          <li><Link to="/" className="hover:text-yellow-400">Home</Link></li>
          <li><Link to="/CreativeWritings" className="hover:text-yellow-400">CreativeWritings</Link></li>
          <li><Link to="/Category" className="hover:text-yellow-400">Category</Link></li>
          <li><Link to="/About" className="hover:text-yellow-400">About</Link></li>
          <li><Link to="/Contact" className="hover:text-yellow-400">Contact</Link></li>
        </ul>

        {/* Mobile Toggle — hidden only on Home */}
        {!isHome && (
          <div
           ref={toggleRef}
            className="md:hidden flex flex-col gap-1 cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span
              className={`h-0.5 w-7 bg-white rounded transition-all duration-300 ${
                isOpen ? "rotate-45 translate-y-2" : ""
              }`}
            ></span>
            <span
              className={`h-0.5 w-7 bg-white rounded transition-all duration-300 ${
                isOpen ? "opacity-0" : ""
              }`}
            ></span>
            <span
              className={`h-0.5 w-7 bg-white rounded transition-all duration-300 ${
                isOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            ></span>
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      {!isHome && (
        <div
        ref={menuRef}
          className={`md:hidden absolute top-full left-0 w-50 h-[100vh] 
          bg-gray-900 text-white flex flex-col flex-end items-center gap-6 py-6 transform transition-all duration-500 
          ${isOpen ? "opacity-90 translate-y-0" : "opacity-0 -translate-x-10 pointer-events-none "}`}
        >
          <Link to="/" onClick={() => setIsOpen(false)} className="hover:text-yellow-400 "><div className="flex items-center gap-2 text-sm sm:text-base md:text-lg">
  <HiHome className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
  <span>Home</span>
</div>
</Link>
          <Link to="/CreativeWritings" onClick={() => setIsOpen(false)} className="hover:text-yellow-400"><div className="flex items-center gap-2 text-sm sm:text-base md:text-lg">
  <FiBookOpen className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
  <span>CreativeWritings</span>
</div></Link>
          <Link to="/Category" onClick={() => setIsOpen(false)} className="hover:text-yellow-400"><div className="flex items-center gap-2 text-sm sm:text-base md:text-lg">
  <LuLayers className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
  <span>Category</span>
</div></Link>
          <Link to="/About" onClick={() => setIsOpen(false)} className="hover:text-yellow-400"><div className="flex items-center gap-2 text-sm sm:text-base md:text-lg">
  <IoMdInformationCircleOutline className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
  <span>About</span>
</div></Link>
          <Link to="/Contact" onClick={() => setIsOpen(false)} className="hover:text-yellow-400"><div className="flex items-center gap-2 text-sm sm:text-base md:text-lg">
  <LuMail className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
  <span>Contact</span>
</div></Link>
        </div>
      )}
    </nav>
  );
}
