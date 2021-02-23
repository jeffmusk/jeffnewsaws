import React from "react";
import { NavLink } from "react-router-dom";

export default function NavBar() {
  return (
    <div>
      <div className="relative bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className=" flex justify-between items-center border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
            <div className="flex justify-around  lg:w-0 lg:flex-1 font-sans ">
              <NavLink
                to="/"
                activeStyle={{
                  fontWeight: "bold",
                  color: "red",
                }}
              >
                <img
                  className="h-6 w-auto sm:h-10"
                  src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                  alt=""
                ></img>
              </NavLink>

              <NavLink
                to="/login"
                activeStyle={{
                  fontWeight: "bold",
                  color: "red",
                }}
              >
                <p>Login</p>
              </NavLink>

              <NavLink
                to="/profile"
                activeStyle={{
                  fontWeight: "bold",
                  color: "red",
                }}
              >
                <p>Perfil</p>
              </NavLink>

              <NavLink
                to="/singup"
                activeStyle={{
                  fontWeight: "bold",
                  color: "red",
                }}
              >
                <p>Iniciar Sesion</p>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
