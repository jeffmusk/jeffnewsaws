import React from "react";
import { Redirect, Route } from "react-router-dom";

export default function PublicRoutes({
  component: Component,
  currectUser,
  rest,
}) {
  return (
    <Route
      {...rest}
      render={(props) =>
        currectUser ? <Redirect to="/" /> : <Component {...props} />
      }
    />
  );
}
