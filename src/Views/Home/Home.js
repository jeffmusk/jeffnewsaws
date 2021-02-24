import React from "react";
import { useCurrentUser } from "../../Contex/UserContext";

export default function Home() {
  const { user } = useCurrentUser();

  return (
    <div>
      Hola: {user ? user.attributes.email : "No logueado"}
      <img
        src="https://designsmaz.com/wp-content/uploads/2019/03/Shards.jpg"
        alt=""
        style={{ margin: "auto" }}
      />
    </div>
  );
}
