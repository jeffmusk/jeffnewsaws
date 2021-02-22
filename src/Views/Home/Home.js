import React from "react";
import { useUsuario } from "../../Contex/UserContext";

export default function Home() {
  const { user } = useUsuario();
  return (
    <div>
      Hola: {user ? user.email : "No logueado"}
      <img
        src="https://designsmaz.com/wp-content/uploads/2019/03/Shards.jpg"
        alt=""
        style={{ margin: "auto" }}
      />
    </div>
  );
}
