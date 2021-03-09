import { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
/* import {
  AmplifyAuthenticator,
  AmplifySignUp,
  AmplifySignIn,
  AmplifyForgotPassword,
} from "@aws-amplify/ui-react"; */

import Home from "./Views/Home/Home";
import News from "./Views/News/News";
import ListNews from "./Views/News/ListNews";
import AuthForm from "./Views/AuthForm/AuthForm";
import Profile from "./Views/Profile/Profile";
import NavBar from "./Layouts/NavBar/NavBar";
import PrivateRoutes from "./Utils/Routes/PrivateRoutes";
import PublicRoutes from "./Utils/Routes/PublicRoutes";
import { useCurrentUser } from "./Contex/UserContext";

function App() {
  const [currentUser, setCurrentUser] = useState(false);
  const { user } = useCurrentUser();

  useEffect(() => {
    setCurrentUser(user);
  }, [user]);

  return (
    <div>
      <Router>
        <NavBar />

        <Switch>
          <Route exact path="/home" component={Home} />
          <Route exact path="/" component={AuthForm} />

          <PublicRoutes
            path="/auth"
            currectUser={currentUser}
            component={AuthForm}
          />
          <PrivateRoutes
            path="/profile"
            currectUser={currentUser}
            component={Profile}
          />
          <PrivateRoutes
            path="/news"
            currectUser={currentUser}
            component={News}
          />
          <PrivateRoutes
            path="/listnews"
            currectUser={currentUser}
            component={ListNews}
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
