import React from "react";

import AuthUserContext from "./context";
import { withFirebase } from "../Firebase";

const withAuthentication = Component => {
  const WithAuthentication = ({ firebase }) => {
    const [state, setState] = React.useState({
      authUser: null
    });

    React.useEffect(() => {
      let listener = firebase.auth.onAuthStateChanged(authUser => {
        authUser ? setState({ authUser }) : setState({ authUser: null });
      });
      return () => {
        listener();
      };
    }, []);
    return (
      <AuthUserContext.Provider value={state}>
        <AuthUserContext.Consumer>
          {props => <Component {...props} />}
        </AuthUserContext.Consumer>
      </AuthUserContext.Provider>
    );
  };
  return withFirebase(WithAuthentication);
};
export default withAuthentication;
