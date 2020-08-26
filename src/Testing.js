import React, { Component } from 'react';
import LoginRequiredAction from './LoginRequiredAction'

class Testing extends Component {
  constructor(props) {
    super(props)

    this.onClick = this.onClick.bind(this)
  }

  onClick(e) {
    console.log("onClickCalled")
    console.log(e)
    console.log(e.target)
  }

  render() {
    return (
      <div>
        <LoginRequiredAction action={this.onClick} render={action => {
          return <button onClick={action}>Button</button>
        }} />
      </div>
    );
  }
}

export default Testing;