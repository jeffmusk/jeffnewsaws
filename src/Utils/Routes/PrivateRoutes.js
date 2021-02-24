import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";

export default function PrivateRoutes({
  component: Component,
  currectUser,
  rest,
}) {
  console.log(currectUser);
  return (
    <Route
      {...rest}
      render={(props) =>
        currectUser ? <Component {...props} /> : <Redirect to="/auth" />
      }
    />
  );
}
