import React, { useEffect } from "react";
import Navbar from "../Components/Navbar";

import { connect } from "react-redux";
import { checkAuthenticated, laodUser } from "../actions/auth";
import { loadAllData } from "../actions/api";

const Layout = (props) => {
  useEffect(() => {
    props.checkAuthenticated();
    props.laodUser();
  }, []);

  return (
    <div>
      <Navbar />

      {props.children}
    </div>
  );
};

export default connect(null, { checkAuthenticated, laodUser })(Layout);
