import React from "react";
import DashboardHead from "../../component/DashboardHead";
import axios from "axios";
import baseUrl from "../../config";
import Section from "../../component/Section";
import Table from "../../component/Table";
import Modal from "../../component/Modal";
import LoadingFull from "../../component/LoadingFull";

const Role = () => {
  const [Role, setRole] = React.useState([]);
  const [Loading, setLoading] = React.useState(true);
  const [Update, setUpdate] = React.useState(false);
  const [Tambah, setTambah] = React.useState({ role: "" });
  const [Edit, setEdit] = React.useState({ id: "", role: "" });
  const [Hapus, setHapus] = React.useState({ id: "" });
  const token = JSON.parse(localStorage.getItem("token"));
  React.useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    axios
      .get(`${baseUrl}/api/role/getAll`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        signal: signal,
      })
      .then((res) => {
        if (res.data.data !== null) {
          setRole(res.data.data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
    return function cleanup() {
      abortController.abort();
    };
  }, [token, Update]);

  const handleTambah = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post(`${baseUrl}/api/role/store`, Tambah, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setUpdate(!Update);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  const handleEdit = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .put(`${baseUrl}/api/role/update/${Edit.id}`, Edit, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setUpdate(!Update);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  const handleDelete = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .delete(`${baseUrl}/api/role/delete/${Hapus.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setUpdate(!Update);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  return (
    <div>
      {Loading ? <LoadingFull /> : ""}
      <DashboardHead title="Role" />
      <Modal id="tambah" title="Tambah Role" size="md">
        <form onSubmit={handleTambah}>
          <div className="modal-body">
            <div className="form-group">
              <label htmlFor="role">Role</label>
              <input
                type="text"
                className="form-control"
                name="role"
                id="role"
                placeholder="Masukkan role"
                onChange={(e) => {
                  setTambah({ role: e.target.value });
                }}
              />
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
            <button type="submit" className="btn btn-primary">
              Tambah
            </button>
          </div>
        </form>
      </Modal>
      <Modal id="edit" title="Edit Role" size="md">
        <form onSubmit={handleEdit}>
          <div className="modal-body">
            <div className="form-group">
              <label htmlFor="role">Role</label>
              <input
                type="text"
                className="form-control"
                name="role"
                id="role"
                value={Edit.role}
                placeholder="Masukkan role"
                onChange={(e) => {
                  const { name, value } = e.target;
                  let data = { ...Edit, [name]: value };
                  setEdit(data);
                }}
              />
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
            <button type="Submit" className="btn btn-primary">
              Edit
            </button>
          </div>
        </form>
      </Modal>
      <Modal id="hapus" title="Hapus Role" size="md">
        <form onSubmit={handleDelete}>
          <div className="modal-body">
            <h3>Apakah Anda Yakin ?</h3>
          </div>
          <div className="modal-footer justify-content-between">
            <button
              type="button"
              className="btn btn-default"
              data-dismiss="modal"
            >
              Tutup
            </button>
            <button type="Submit" className="btn btn-primary">
              Hapus
            </button>
          </div>
        </form>
      </Modal>
      <Section>
        <Table title="List Role" tambah="Tambah">
          <table id="example1" className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>No</th>
                <th>Role</th>
                <th className="text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {Role.length > 0 ? (
                Role.map((row, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{row.role}</td>
                    <td className="text-center">
                      <button
                        type="button"
                        className="btn btn-warning btn-sm"
                        data-toggle="modal"
                        data-target="#edit"
                        onClick={(e) => {
                          setEdit({ id: row.id, role: row.role });
                        }}
                      >
                        <i className="fa fa-fw fa-edit"></i>
                      </button>{" "}
                      <button
                        type="button"
                        className="btn btn-danger btn-sm"
                        data-toggle="modal"
                        data-target="#hapus"
                        onClick={(e) => {
                          setHapus({ id: row.id });
                        }}
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

export default Role;
