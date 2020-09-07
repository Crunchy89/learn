import React from "react";

const LoadingFull = () => {
  return (
    <div
      className={`modal fade show`}
      style={{
        display: "block",
        backgroundColor: `rgba(0,0,0,0.5)`,
        zIndex: 9999,
      }}
    >
      <div
        className="overlay d-flex justify-content-center align-items-center"
        style={{ position: "absolute", width: "100%", height: "100%" }}
      >
        <i className="fas fa-2x fa-sync fa-spin text-white"></i>
      </div>
    </div>
  );
};

export default LoadingFull;
