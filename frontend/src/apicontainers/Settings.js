import React, { useState } from "react";

const Settings = ({ setProgress }) => {
  setProgress(100);
  const [mode, setMode] = useState("Enable Dark Mode");

  const handleMode = () => {
    if (mode === "Enable Dark Mode") {
      setMode("Disable Dark Mode");
      localStorage.setItem("mode", "light");
    } else {
      setMode("Enable Dark Mode");
      localStorage.setItem("mode", "dark");
    }
  };
  return (
    <>
      <div className="container" >
        <br />
        <br />

        <div className="card">
          <div className="card-body">
            <h4>App Mode</h4>
            <button className="btn btn-dark" onClick={handleMode}>
              {mode}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;
