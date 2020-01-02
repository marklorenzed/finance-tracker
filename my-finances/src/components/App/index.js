import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

// components
import Navigation from "../Navigation";
import LandingPage from "../Landing";
import SignUpPage from "../SignUp";
import SignInPage from "../SignIn";
import PasswordForgetPage from "../PasswordForget";
import HomePage from "../Home";
import AccountPage from "../Account";
import AdminPage from "../Admin";

import * as ROUTES from "../../constants/routes";

const App = () => (
  <Router>
    <div>
      <Navigation />
      <hr />
      <Route exact path={ROUTES.LANDING} />
      <Route path={ROUTES.SIGN_UP} />
      <Route path={ROUTES.SIGN_IN} />
      <Route path={ROUTES.PASSWORD_FORGET} />
      <Route path={ROUTES.HOME} />
      <Route path={ROUTES.ACCOUNT} />
      <Route path={ROUTES.ADMIN} />
    </div>
  </Router>
);
export default App;
