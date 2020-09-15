import React from 'react';
import tabContext from './tabContext'

function withTabContext(WrappedComponent) {
  return React.forwardRef((props, ref) => (
    <tabContext.Consumer>
      {tabContext => (<WrappedComponent {...props} tabContext={tabContext} ref={ref} />)}
    </tabContext.Consumer>))
}

export default withTabContext;