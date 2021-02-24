import React, { useEffect, useMemo, useState, createContext } from "react";
import { Hub, Auth } from "aws-amplify";

const UserContext = createContext();

export function UserProvider(props) {
  const [user, setUser] = useState(null);

  async function checkUser() {
    try {
      const user = await Auth.currentAuthenticatedUser();
      console.log(user);
      setUser(user);
    } catch (error) {
      console.log(error);
      setUser(null);
    }
  }

  useEffect(() => {
    console.log("cargando usuarios");
    checkUser();

    /*  function currentUser() {
      Auth.currentAuthenticatedUser()
        .then((user) => setUser(user), console.log(user))
        .catch((err) => console.log(err));
    }
    currentUser();*/

    Hub.listen("auth", (data) => {
      switch (data.payload.event) {
        case "signIn":
          console.log("inicio de sesion");
          console.log(data);
          checkUser();
          break;
        case "signUp":
          console.log("user signed up");
          checkUser();
          break;
        case "signOut":
          setUser(null);
          console.log("user signed out");
          break;
        case "signIn_failure":
          console.log("user sign in failed");
          break;
        case "configured":
          console.log("the Auth module is configured");
          break;
        default:
          break;
      }
    });
  }, []);

  const value = useMemo(() => {
    return {
      user,
    };
  }, [user]);
  return <UserContext.Provider value={value} {...props} />;
}

export function useCurrentUser() {
  const context = React.useContext(UserContext);
  if (!context) {
    throw new Error(
      "UserContext debe estar dentro de un proveedor de UserContext"
    );
  }
  return context;
}
