import React from "react";
import { Link } from "react-router-dom";

export default function MenuComponent(props) {
  const { link, title, icon, submenu } = props;
  return (
    <>
      {submenu.length > 0 ? (
        <li className="nav-item has-treeview">
          <a href=" " className="nav-link">
            <i className={`nav-icon ${icon ? icon : "fas fa-th"}`}></i>{" "}
            <p>{title ? title : "Menu"}</p>
            <i className="fas fa-angle-left right"></i>
          </a>
          <ul className="nav nav-treeview">
            {submenu.map((data, index) => (
              <li key={index} className="nav-item">
                <Link to={`/admin/${data.link}`} className="nav-link">
                  <i className={`${data.icon}`}></i> <p>{data.title}</p>
                </Link>
              </li>
            ))}
          </ul>
        </li>
      ) : (
        <li className="nav-item">
          <Link to={link ? `/${link}` : "#"} className="nav-link">
            <i className={`nav-icon ${icon ? icon : "fas fa-th"}`}></i>{" "}
            <p>{title ? title : "Menu"}</p>
          </Link>
        </li>
      )}
    </>
  );
}
