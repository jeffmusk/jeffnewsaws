import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useCurrentUser } from "../../Contex/UserContext";
import "./NavBar.css";

export default function NavBar() {
  const { user } = useCurrentUser();
  const [isVisible, setIsVisible] = useState(true);

  const setVisible = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div>
      <div className="relative bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-2 ">
          <nav className="flex justify-between items-center border-b-2 border-gray-100 py-6">
            {/* logo */}
            <div className="flex  flex-1">
              <NavLink
                to="/"
                activeStyle={{
                  fontWeight: "bold",
                  color: "red",
                }}
              >
                <img
                  className="h-8 w-auto "
                  src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                  alt="logo"
                ></img>
              </NavLink>
            </div>
            {/* Menu hamburguesa */}
            <div className="-mr-2 -my-2 md:hidden">
              <button
                className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                aria-expanded="false"
                onClick={setVisible}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </button>
            </div>

            {/* link 1 mis noticias */}
            <div className="hidden md:flex space-x-6 justify-center flex-1">
              <NavLink
                to="/listnews"
                className="navLink  "
                activeStyle={{
                  fontWeight: "bold",
                  color: "#6366F1",
                }}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                  ></path>
                </svg>
                <span>Mis Noticias</span>
              </NavLink>
              <NavLink
                to="/news"
                className="navLink"
                activeStyle={{
                  fontWeight: "bold",
                  color: "#6366F1",
                }}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  ></path>
                </svg>
                <span>Crear Noticia</span>
              </NavLink>
              <NavLink
                to="/search"
                className="navLink"
                activeStyle={{
                  fontWeight: "bold",
                  color: "#6366F1",
                }}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 21h7a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v11m0 5l4.879-4.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242z"
                  ></path>
                </svg>
              </NavLink>
            </div>
            {/* link 2  */}
            <div className="hidden md:flex space-x-4 justify-end flex-1  ">
              {user ? (
                <NavLink
                  to="/profile"
                  className="navLink"
                  activeStyle={{
                    fontWeight: "bold",
                    color: "#6366F1",
                  }}
                >
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                </NavLink>
              ) : (
                <NavLink
                  to="/login"
                  className="px-6 py-2 bg-indigo-500 text-white rounded-lg font-semibold shadow-lg"
                  activeStyle={{
                    fontWeight: "bold",
                    color: "#6366F1",
                  }}
                >
                  <span>Iniciar Sesión</span>
                </NavLink>
              )}
            </div>
          </nav>
        </div>
        {/* Menu movil */}
        <div
          className={` ${
            isVisible && "hidden"
          } md:hidden bg-gray-200 w-full py-2 px-8 justify-center navBar`}
        >
          <NavLink
            to="/search"
            className="navLinkMobile"
            activeStyle={{
              fontWeight: "bold",
              color: "#6366F1",
            }}
            onClick={setIsVisible}
          >
            <svg
              className="w-6 h-6 group-hover:text-indigo-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 21h7a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v11m0 5l4.879-4.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242z"
              ></path>
            </svg>
          </NavLink>
          <NavLink
            to="/listnews"
            className="navLinkMobile"
            activeStyle={{
              fontWeight: "bold",
              color: "#6366F1",
            }}
            onClick={setIsVisible}
          >
            <svg
              className="w-5 h-5 group-hover:text-indigo-500 "
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
              ></path>
            </svg>

            <span className="group-hover:text-indigo-500">Mis Noticias</span>
          </NavLink>
          <NavLink
            to="/news"
            className="navLinkMobile"
            activeStyle={{
              fontWeight: "bold",
              color: "#6366F1",
            }}
            onClick={setIsVisible}
          >
            <svg
              className="w-5 h-5 group-hover:text-indigo-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              ></path>
            </svg>
            <span className="group-hover:text-indigo-500">Crear Noticia</span>
          </NavLink>
          {user ? (
            <NavLink
              to="/profile"
              className="navLinkMobile"
              activeStyle={{
                fontWeight: "bold",
                color: "#6366F1",
              }}
              onClick={setIsVisible}
            >
              <svg
                className="w-6 h-6 mr-2 group-hover:text-indigo-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <span className="group-hover:text-indigo-500">Perfil</span>
            </NavLink>
          ) : (
            <NavLink
              to="/login"
              className="navLinkMobile bg-indigo-500 text-white rounded-lg font-semibold shadow-lg"
              activeStyle={{
                fontWeight: "bold",
                color: "#fff",
              }}
              onClick={setIsVisible}
            >
              <span>Iniciar Sesión</span>
            </NavLink>
          )}
        </div>
      </div>

      {/* an nav */}
      {/*  <div className="relative bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className=" flex justify-between items-center border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
            <div className="flex justify-around  lg:w-0 lg:flex-1 font-sans md:w-0 md:flex-1  ">
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
                to="/listnews"
                activeStyle={{
                  fontWeight: "bold",
                  color: "red",
                }}
              >
                <p>Mis Noticias</p>
              </NavLink>
              <NavLink
                to="/news"
                activeStyle={{
                  fontWeight: "bold",
                  color: "red",
                }}
              >
                <p>Crear Noticia</p>
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
                to="/auth"
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
      </div> */}
    </div>
  );
}
