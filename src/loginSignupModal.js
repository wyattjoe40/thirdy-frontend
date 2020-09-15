import React, { Component } from 'react';
import loginContext from './loginContext'
import LoginSignup from './LoginSignup'
import ReactModal from 'react-modal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class loginSignupModal extends Component {
  render() {
    return (
      <loginContext.Consumer>
        {(loginContext) => (<div>
          <ReactModal onRequestClose={() => loginContext.closeLogin()} isOpen={loginContext.isLoginOpen}>
            <button className="modal-close" onClick={loginContext.closeLogin}>
              <FontAwesomeIcon icon="times" />
            </button>
            <LoginSignup />
          </ReactModal>
        </div>)}
      </loginContext.Consumer>
    );
  }
}

export default loginSignupModal;
