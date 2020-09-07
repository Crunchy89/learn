import React from "react";
import DashboardHead from "../../component/DashboardHead";
import axios from "axios";
import baseUrl from "../../config";
import Section from "../../component/Section";
import Table from "../../component/Table";
import Modal from "../../component/Modal";
import LoadingFull from "../../component/LoadingFull";

const User = () => {
  const [Data, setData] = React.useState([]);
  const [Role, setRole] = React.useState([]);
  const [Tambah, setTambah] = React.useState({
    username: "",
    email: "",
    password: "",
    role_id: "",
  });
  const [Loading, setLoading] = React.useState(true);
  const token = JSON.parse(localStorage.getItem("token"));
  React.useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    axios
      .get(`${baseUrl}/api/user/getUser`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        signal: signal,
      })
      .then((res) => {
        console.log(res.data.data);
        if (res.data.data !== null) {
          setData(res.data.data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });

    axios
      .get(`${baseUrl}/api/role/getAll`, { signal: signal })
      .then((res) => {
        console.log(res.data);
        if (res.data.data !== null) {
          setRole(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    return function cleanup() {
      abortController.abort();
    };
  }, [token]);
  const handleTambah = (e) => {
    const { name, value } = e.target;
    let data = { ...Tambah, [name]: value };
    setTambah(data);
  };
  return (
    <div>
      {Loading ? <LoadingFull /> : ""}
      <DashboardHead title="User" />
      <Modal id="tambah" title="Tambah User" size="md">
        <form>
          <div className="modal-body">
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                className="form-control"
                name="username"
                id="username"
                placeholder="Masukkan username"
                onChange={handleTambah}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                id="email"
                placeholder="Masukkan email"
                onChange={handleTambah}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                id="password"
                placeholder="Masukkan Password"
                onChange={handleTambah}
              />
            </div>
            <div className="form-group">
              <label htmlFor="role">Role</label>
              <select
                name="role"
                id="role"
                className="form-control"
                onChange={handleTambah}
              >
                <option value="">Pilih Role</option>
                {Role.map((row, index) => {
                  <option value={`${row.id}`}>{row.role}</option>;
                })}
              </select>
            </div>
          </div>
          <div className="modal-footer justify-content-between">
            <button
              type="button"
              className="btn btn-default"
              data-dismiss="modal"
            >
              Tutup
            </button>
            <button type="button" className="btn btn-primary">
              Tambah
            </button>
          </div>
        </form>
      </Modal>
      <Section>
        <Table title="List User" tambah="Tambah">
          <table id="example1" className="table table-bordered table-striped">
            <thead>
              <tr>
                <th className="text-center">No</th>
                <th>Username</th>
                <th>Email</th>
                <th>Role</th>
                <th className="text-center">Password</th>
                <th className="text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {Data.length > 0 ? (
                Data.map((row, index) => (
                  <tr key={index}>
                    <td className="text-center">{index + 1}</td>
                    <td>{row.username}</td>
                    <td>{row.email}</td>
                    <td>{row.role}</td>
                    <td className="text-center">
                      <button className="btn btn-info btn-sm">
                        <i className="fa fa-fw fa-eye"></i> Reset Password
                      </button>
                    </td>
                    <td className="text-center">
                      <button
                        type="button"
                        className="btn btn-warning btn-sm"
                        data-toggle="modal"
                        data-target="#edit"
                      >
                        <i className="fa fa-fw fa-edit"></i>
                      </button>{" "}
                      <button
                        type="button"
                        className="btn btn-danger btn-sm"
                        data-toggle="modal"
                        data-target="#hapus"
                      >
                        <i className="fa fa-fw fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3">Belum ada data</td>
                </tr>
              )}
            </tbody>
          </table>
        </Table>
      </Section>
    </div>
  );
};

export default User;
