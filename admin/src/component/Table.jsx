import React from "react";

const Table = (props) => {
  const { title, tambah } = props;
  return (
    <React.Fragment>
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">{title ? title : "List"}</h3>
          {tambah ? (
            <>
              <br />
              <hr />
              <button
                type="button"
                className="btn btn-primary btn-sm"
                data-toggle="modal"
                data-target="#tambah"
              >
                <i className="fa fa-fw fa-plus"></i> {tambah}
              </button>
            </>
          ) : (
            ""
          )}
        </div>
        <div className="card-body">
          <div className="table-responsive">{props.children}</div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Table;
