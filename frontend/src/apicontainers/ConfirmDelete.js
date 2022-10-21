import React from "react";

const ConfirmDelete = () => {
  return (
    <div className="container">
      <br />
      <div className="card">
        <div className="card-body">
          <div className="title">
            <h3 style={{color:"red"}}>Are You Sure to Delete The Post?</h3>
          </div>
        </div>
      </div>
      <br />
      <button className="btn btn-info">No,Keep it</button>
      <button className="btn btn-danger mx-2">Yes,I am Sure</button>
    </div>
  );
};

export default ConfirmDelete;
