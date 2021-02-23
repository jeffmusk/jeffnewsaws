import React, { useState } from "react";
import { Cache, Auth } from "aws-amplify";
/* import { singUpUser } from "../../store/actions/auth";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify"; */

import { validateEmail } from "../../Utils/validateEmails";

export default function SingUp() {
  /*  const dispatch = useDispatch(); */
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [hiddenPass, setHiddenPass] = useState(false);

  const handleEmailChange = ({ target }) => {
    setEmail(target.value);
  };

  const handlePasswordChange = ({ target }) => {
    setPassword(target.value);
  };

  const handlePasswordChange2 = ({ target }) => {
    setPassword2(target.value);
  };

  const handleSubmit = async () => {
    const dateNow = Date.now();
    var oneDay = new Date(dateNow + 86400000);

    if (validateEmail(email)) {
      /* email valido */
      if (password === password2 && password.length > 5) {
        Cache.setItem(
          "DataUser",
          { email, password },
          { priority: 3, expires: oneDay.getTime() }
        );
        try {
          const { user } = await Auth.signUp({
            username: email,
            password,
          });
          console.log(user);
        } catch (error) {
          console.log("error signing up:", error);
        }
        console.log("Registrandose");
      } else {
        console.log(
          "Las contraseñas deben coincidir y tener mas de 5 caracteres"
        );
      }
    } else {
      console.log("email no valido");
    }
  };

  return (
    <div className="main">
      <div className="containerLogin">
        <input type="email" placeholder="Email" onChange={handleEmailChange} />
        <input
          type={hiddenPass ? "text" : "password"}
          placeholder="contraseña"
          onChange={handlePasswordChange}
        />
        <input
          type={hiddenPass ? "text" : "password"}
          placeholder="Confirmar contraseña"
          onChange={handlePasswordChange2}
          className="my-5"
        />
        <label>
          <input
            type="checkbox"
            checked={hiddenPass}
            onChange={() => setHiddenPass(!hiddenPass)}
          />
          Ver contraseña
        </label>
        <br />
        <button id="singup" onClick={handleSubmit}>
          Resgistrarme
        </button>

        <br />
      </div>
    </div>
  );
}
