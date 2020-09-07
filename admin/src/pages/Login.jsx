import React from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import baseUrl from "../config";
import Swal from "sweetalert";

export default function Login() {
  const [Login, setLogin] = React.useState({ email: "", password: "" });
  const [Error, setError] = React.useState({ email: "", password: "" });
  const [Admin, setAdmin] = React.useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .post(`${baseUrl}/api/auth/login`, Login)
      .then((res) => {
        if (res.data.status === true) {
          Swal({
            title: "Login Berhasil",
            text: "Selamat datang",
            icon: "success",
          });
          localStorage.setItem("token", JSON.stringify(res.data.data.token));
          setAdmin(true);
        } else {
          if (res.data.message === "Error") {
            setError(res.data.data);
            Swal({
              title: "Gagal login",
              text: "Periksa inputan",
              icon: "warning",
            });
          } else {
            console.log(res.data);
          }
        }
      })
      .catch((err) => {
        console.log(err);
        Swal({
          title: "Network Error",
          text: "Silahkan Coba lagi",
          icon: "error",
        });
      });
  };
  const handleinput = (e) => {
    const { name, value } = e.target;
    const data = { ...Login, [name]: value };
    const err = { ...Error, [name]: "" };
    setLogin(data);
    setError(err);
  };

  if (Admin) {
    return <Redirect to="/admin" />;
  }
  return (
    <body className="hold-transition login-page">
      <div className="login-box">
        <div className="login-logo">
          <Link to="/">
            <b>Admin</b>LTE
          </Link>
        </div>
        <div className="card">
          <div className="card-body login-card-body">
            <p className="login-box-msg">Sign in to start your session</p>
            <form onSubmit={handleLogin}>
              <div className="form-group">
                <div className="input-group mb-3">
                  <input
                    type="email"
                    className={`form-control ${
                      Error.email
                        ? Error.email.length > 0
                          ? "is-invalid"
                          : ""
                        : ""
                    }`}
                    name="email"
                    placeholder="Email"
                    value={Login.email}
                    onChange={handleinput}
                  />
                  <div className="input-group-append">
                    <div className="input-group-text">
                      <span className="fas fa-envelope"></span>
                    </div>
                  </div>
                  {Error.email ? (
                    Error.email.length > 0 ? (
                      <span className="error invalid-feedback">
                        {Error.email}
                      </span>
                    ) : (
                      ""
                    )
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div className="form-group">
                <div className="input-group mb-3">
                  <input
                    type="password"
                    className={`form-control ${
                      Error.password
                        ? Error.password.length > 0
                          ? "is-invalid"
                          : ""
                        : ""
                    }`}
                    placeholder="Password"
                    name="password"
                    value={Login.password}
                    onChange={handleinput}
                  />
                  <div className="input-group-append">
                    <div className="input-group-text">
                      <span className="fas fa-lock"></span>
                    </div>
                  </div>
                  {Error.password ? (
                    Error.password.length > 0 ? (
                      <span className="error invalid-feedback">
                        {Error.password}
                      </span>
                    ) : (
                      ""
                    )
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div className="form-group">
                <button type="submit" className="btn btn-success">
                  Login
                </button>
              </div>
            </form>
            <p className="mb-1">
              <Link to="/admin">Lupa password ?</Link>
            </p>
          </div>
        </div>
      </div>
    </body>
  );
}
