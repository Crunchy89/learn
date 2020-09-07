import React from "react";
import { Link } from "react-router-dom";

const DashboardCard = (props) => {
  const { total, title, link, icon, color } = props;
  return (
    <div className="col-lg-3 col-6">
      <div className={`small-box ${color ? color : "bg-info"}`}>
        <div className="inner">
          <h3>{total ? total : "150"}</h3>

          <p>{title ? title : "New Orders"}</p>
        </div>
        <div className="icon">
          <i className={icon ? icon : "ion ion-bag"}></i>
        </div>
        <Link to={link ? link : "#"} className="small-box-footer">
          More info <i className="fas fa-arrow-circle-right"></i>
        </Link>
      </div>
    </div>
  );
};

export default DashboardCard;
