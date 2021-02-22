import React, { useState } from "react";

const Context = React.useContext({});

export default function UserContext() {
  const [user, setUser] = useState(null);

  return (
    <Context.Provider user={{ user, setUser }}>{children}</Context.Provider>
  );
}
