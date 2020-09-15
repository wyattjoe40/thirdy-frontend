import React from 'react';
import loginContext from './loginContext'

function withLoginContext(WrappedComponent) {
  return React.forwardRef((props, ref) => (
    <loginContext.Consumer>
      {loginContext => (<WrappedComponent {...props} loginContext={loginContext} ref={ref} />)}
    </loginContext.Consumer>))
}

export default withLoginContext;