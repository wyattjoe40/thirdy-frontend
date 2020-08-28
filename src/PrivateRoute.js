import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import userContext from "./userContext";

function PrivateRoute({ children, ...rest }) {
  return (
    <userContext.Consumer>
      { userContext => 
      <Route
        {...rest}
        render={({ location }) =>
          userContext.user ? (
            children
          ) : (
              <Redirect
                to={{
                  pathname: "/",
                  state: { from: location }
                }}
              />
            )
        }
      />}
    </userContext.Consumer>
  );
}

export default PrivateRoute