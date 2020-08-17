import React, { Component } from 'react';
import loginContext from './loginContext'
import Signup from './signup'
import Login from './login'
import ReactModal from 'react-modal'

class loginSignupModal extends Component {
  render() {
    return (
      <loginContext.Consumer>
        {(value) => (<div>
          <ReactModal isOpen={false}>
            <button className="modal-close" onClick={value.closeSignup}>
              X
            </button>
            <Signup close={this.onCloseSignup} setUser={this.setUser} />
          </ReactModal>
          <ReactModal isOpen={value.loginTrigger}>
            <button className="modal-close" onClick={value.closeLogin}>
              X
            </button>
            <Login />
          </ReactModal>
        </div>)}
      </loginContext.Consumer>
    );
  }
}

export default loginSignupModal;
