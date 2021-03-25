import React from "react";
import "./Profile.css";

import { AmplifySignOut } from "@aws-amplify/ui-react";

import { Link } from "react-router-dom";
import { useCurrentUser } from "../../Contex/UserContext";
/* import { toast } from "react-toastify"; */

/* const CustomToast = ({ closeToast }) => {
  return (
    <div>
      <h1>Titulo</h1>
      <p>Descripicion larga</p>
    </div>
  );
};
 */
function Profile(props) {
  /*  const { currentUser, isAuthenticated } = props; */
  /* const notify = () =>
    toast(CustomToast, {
      position: toast.POSITION.BOTTOM_RIGHT,
    }); */
  const { user } = useCurrentUser();
  return (
    <div className=" flex flex-col    ">
      <h1 className="bg-gradient-to-r from-green-400 to-blue-500 py-3 font-sans text-lg font-bold flex justify-center text-white">
        Mi Perfil
      </h1>
      <div
        className=" bg-white grid grid-cols-3 mx-10 shadow-lg gap-1 my-5 rounded-md "
        style={{ maxWidth: "600px" }}
      >
        <div className=" ">
          <img
            src="data:image/png;base64,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"
            className="rounded-full m-5 w-2/3 mx-auto"
            alt="foto perfil"
          />
          <p className="text-center pb-2">
            {user ? "email Verificado" : "Email sin verificar"}
          </p>
        </div>
        <div className="bg-gray-100  col-span-2 p-5 font-sans">
          <h2>
            <span className="font-extrabold ">Email: </span>
            {user ? user.attributes.email : "Sin email"}
          </h2>
          <h3>
            <span className="font-extrabold ">Nombre: </span>
            nombre
          </h3>
          <h3>
            <span className="font-extrabold ">Ultima sesion:</span>
            sesion
          </h3>
          <h3>
            <span className="font-extrabold ">Numero celular:</span>
            celular
          </h3>
          <Link
            to="/"
            className="text-xm text-indigo-500 mx-auto"
            style={{ position: "relative", bottom: "-40px" }}
          >
            Cambiar contraseña
          </Link>
        </div>
      </div>
      <AmplifySignOut buttonText="Cerrar sesión" />
    </div>
  );
}

export default Profile;
