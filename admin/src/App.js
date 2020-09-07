import React from "react";
import Login from "./pages/Login";
import Admin from "./pages/Admin.jsx";
import { Route, Switch } from "react-router-dom";

function App() {
  return (
    <Switch>
      <Route exact path="/" component={Login} />
      <Route path="/admin" component={Admin} />
    </Switch>
  );
}

export default App;
