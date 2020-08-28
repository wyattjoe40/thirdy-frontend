import React, { Component } from 'react';
import loginContext from './loginContext'
import LoginSignup from './LoginSignup'
import ReactModal from 'react-modal'

class loginSignupModal extends Component {
  render() {
    return (
      <loginContext.Consumer>
        {(loginContext) => (<div>
          <ReactModal isOpen={loginContext.isLoginOpen}>
            <button className="modal-close" onClick={loginContext.closeLogin}>
              X
            </button>
            <LoginSignup />
          </ReactModal>
        </div>)}
      </loginContext.Consumer>
    );
  }
}

export default loginSignupModal;
