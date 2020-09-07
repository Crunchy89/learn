import React from "react";

const Section = (props) => {
  return (
    <React.Fragment>
      <section className="content">
        <div className="container-fluid">{props.children}</div>
      </section>
    </React.Fragment>
  );
};

export default Section;
