import React from "react";
import { NavLink } from "react-router-dom"; 
import { useNavigate } from "react-router-dom";

function Navbar() { 

  const navigate = useNavigate() ; 

  const logoutUser = ()=> { 

     localStorage.removeItem("user");   // remove token upon logging out 

     navigate("/") ; 

  }
  return (
    <div className="p-6 bg-[#3c009d] text-white flex justify-between items-center ">
      <div className="ml-10 text-lg cursor-pointer">
        <h1> Blog App </h1>
      </div>

      <ul className="flex gap-4 cursor-pointer">
        <NavLink
          to="/home"
          className={({ isActive }) =>
            `${isActive ? "text-emerald-300" : "text-white"}`
          }
        >
          <li> All Blog </li>
        </NavLink>

        <NavLink
          to="/add"
          className={({ isActive }) =>
            `${isActive ? "text-emerald-300" : "text-white"} `
          }
        >
          <li> Add Blog </li>
        </NavLink>
      </ul>

      <div className="mr-10">
        <button 
          onClick={ logoutUser }
          className="bg-white text-[#3c009d] w-[100px] p-2 rounded-md hover:text-red-500">
          {" "}
          Logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;
