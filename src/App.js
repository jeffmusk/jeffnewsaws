import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Home from "./Views/Home/Home";
import Login from "./Views/Login/Login";
import Profile from "./Views/Profile/Profile";
import NavBar from "./Layouts/NavBar/NavBar";

function App() {
  return (
    <div>
      <Router>
        <NavBar />

        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
