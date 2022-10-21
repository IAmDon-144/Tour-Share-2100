import React from "react";

const ApiCollection = () => {
  return (
    <div className="container">
      <br />
      <div className="card">
        <div className="card-body">
          <div className="row">
            <div className="col-sm-3">
              <h3>GET ALL DATAS</h3>
            </div>
            <div className="col-sm-9">
              <input
                type="text"
                value={"http://127.0.0.1:8000/get/"}
                className="form-control"
              />
              <br />
              <p>METHOD:GET</p>
              <p>ALLOW ANY</p>
            </div>
          </div>
        </div>
      </div>

      <br />
      <div className="card">
        <div className="card-body">
          <div className="row">
            <div className="col-sm-3">
              <h3>GET SINGLE DATA</h3>
            </div>
            <div className="col-sm-9">
              <input
                type="text"
                value={"http://127.0.0.1:8000/get/<str:id>/"}
                className="form-control"
              />
              <br />
              <p>METHOD:GET</p>
              <p>ALLOW ANY</p>
            </div>
          </div>
        </div>
      </div>
      <br />
      <div className="card">
        <div className="card-body">
          <div className="row">
            <div className="col-sm-3">
              <h3>GET PROFILE</h3>
            </div>
            <div className="col-sm-9">
              <input
                type="text"
                value={"http://127.0.0.1:8000/get-profile/<str:pk>/"}
                className="form-control"
              />
              <br />
              <p>METHOD:GET</p>
              <p>AUTHORIZED</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiCollection;
