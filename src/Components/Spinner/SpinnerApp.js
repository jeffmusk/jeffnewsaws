import React from "react";
import { AmplifyLoadingSpinner } from "@aws-amplify/ui-react";

export default function SpinnerApp() {
  return (
    <div
      style={{
        width: "100vw",
        background: "#f0f0f0",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <AmplifyLoadingSpinner />
    </div>
  );
}
