import React from 'react';
import userContext from './userContext'

function withUserContext(WrappedComponent) {
  return React.forwardRef((props, ref) => (
    <userContext.Consumer>
      {userContext => (<WrappedComponent {...props} userContext={userContext} ref={ref} />)}
    </userContext.Consumer>))
}

export default withUserContext;