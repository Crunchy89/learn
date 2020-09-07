import React from "react";
import { Link } from "react-router-dom";

const DashboardHead = (props) => {
  const { title } = props;
  return (
    <div className="content-header">
      <div className="container-fluid">
        <div className="row mb-2">
          <div className="col-sm-6">
            <h1 className="m-0 text-dark">{title ? title : "Dashboard"}</h1>
          </div>
          <div className="col-sm-6">
            <ol className="breadcrumb float-sm-right">
              <li className="breadcrumb-item">
                <Link to="/admin">Home</Link>
              </li>
              <li className="breadcrumb-item active">
                {title ? title : "Dashboard"}
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHead;
