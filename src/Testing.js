import React, { Component } from 'react';

class Testing extends Component {
  constructor(props) {
    super(props)

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e) {
    console.log("onClickCalled")
    console.log(e.target.value)
  }

  render() {
    return (
      <div>
      </div>
    );
  }
}

export default Testing;