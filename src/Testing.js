import React, { Component } from 'react';
import TimezonePicker from './TimezonePicker';

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
        <TimezonePicker
          onChange={this.handleChange}
          defaultValue={'America/New_York'}
          unselectLabel="No Timezone"
          className="bg-green-600"
          style={{
            borderRadius: '0.5rem',
            color: 'white',
          }}
        />
      </div>
    );
  }
}

export default Testing;