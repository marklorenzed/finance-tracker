// src/components/PrivateRoute.js

import React, { useEffect } from "react";
import { Route } from "react-router-dom";

const PrivateRoute = ({ component: Component, path, authUser, ...rest }) => {
  const render = props => (authUser ? <Component {...props} /> : null);

  return <Route path={path} render={render} {...rest} />;
};

export default PrivateRoute;
