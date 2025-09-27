import React from "react";
import { BookOpen, Layers, Info,  ContactRound } from "lucide-react";
import { Link } from "react-router-dom";


const AnimatedIcons = () => {
  return (
    <>
    <div className="flex justify-end md:hidden">
      {/* Black Box */}
      <div className="flex gap-1 items-start justify-center  h-52  rounded-xl relative top-20 ">
        
        {/* Creative Writing */}
        <div className="flex flex-col items-center w-20 text-center">
          
          <span className="mb-2 text-black text-xs leading-tight">
            Creative<br />Writing
          </span>
         
          <Link to={"/CreativeWritings"}>
          <div className="flex items-center justify-center w-10 h-10 rounded-full text-black animate-pop delay-0 color-1 ">
            <BookOpen className="w-5 h-5" />
          </div>
           </Link>
          
        </div>

        {/* Category */}
        <div className="flex flex-col items-center w-20 text-center">
          <span className="mb-5 text-black text-xs">
            Category
          </span>
          <Link to={"/Category"}>
          <div className="flex items-center justify-center w-10 h-10 rounded-full text-black animate-pop delay-1 color-2">
            <Layers className="w-5 h-5" />
          </div>
          </Link>
        </div>

        {/* About Us */}
        <div className="flex flex-col items-center w-20 text-center">
          <span className="mb-5 text-black text-xs">
            About Us
          </span>

          <Link to={"/About"}>
          <div className="flex items-center justify-center w-10 h-10 rounded-full text-black animate-pop delay-2 color-3">
            <Info className="w-5 h-5" />
          </div>
          </Link>
        </div>

        {/* Contact */}
        <div className="flex flex-col items-center w-20 text-center">
          <span className="mb-5 text-black text-xs">
            Contact
          </span>
          <Link to={"/Contact"}>
          <div className="flex items-center justify-center w-10 h-10 rounded-full text-black animate-pop delay-3 color-4">
            < ContactRound className="w-5 h-5" />
          </div>
          </Link>
        </div>
      </div>
    </div>
   
    </>
  );
};

export default AnimatedIcons;
