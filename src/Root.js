import React from "react";
import { UserProvider } from "./Contex/UserContext";
import App from "./App";

export default function Root() {
  return (
    <UserProvider>
      <App></App>
    </UserProvider>
  );
}
