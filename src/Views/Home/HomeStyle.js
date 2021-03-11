import { makeStyles } from "@material-ui/core";

export const AppStyles = makeStyles({
  root: {
    marginTop: "5px",
    background: "#efefef",
  },
  newsGrid: {
    margin: "auto",
  },
  newsWrapper: {
    height: "100vh",

    overflow: "auto",
    overflowX: "hidden",
  },
});
