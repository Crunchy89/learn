import React from "react";
import Header from "../component/Header";
import Sidebar from "../component/Sidebar";
import Footer from "../component/Footer";
import { Route, Switch } from "react-router-dom";
import Dashboard from "./Admin/Dashboard";
import Role from "./Admin/Role";
import User from "./Admin/User";

export default function Admin() {
  return (
    <body className="hold-transition sidebar-mini layout-fixed">
      <div className="wrapper">
        <Header />
        <Sidebar />
        <div className="content-wrapper" style={{ position: "relative" }}>
          <Switch>
            <Route exact path="/admin" component={Dashboard} />
            <Route path="/admin/role" component={Role} />
            <Route path="/admin/user" component={User} />
          </Switch>
        </div>
        <Footer />
      </div>
    </body>
  );
}
