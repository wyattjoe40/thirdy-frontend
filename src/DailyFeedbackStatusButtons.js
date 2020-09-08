import React, { Component } from 'react';
import PropTypes from 'prop-types'

class DailyFeedbackStatusButtons extends Component {
  constructor(props) {
    super(props)

    this.state = {}

    this.onStatusSelected = this.onStatusSelected.bind(this)
  }


  onStatusSelected(status) {
    this.setState({saving: true})
    this.props.onUpdateStatus(status, (err) => {
      if (err) {
        alert(err)
      }

      this.setState({saving: false})
    })
  }

  render() {
    console.log(this.props)
    return (
      <div className="flex items-center">
        <button disabled={this.state.saving} onClick={() => this.onStatusSelected('completed')} className="btn btn-green">Complete</button>
        <button disabled={this.state.saving} onClick={() => this.onStatusSelected('skipped')} className="btn btn-orange">Skip</button>
        { this.state.saving && <p>Saving...</p>}
      </div>
    );
  }
}

DailyFeedbackStatusButtons.propTypes = {
  onUpdateStatus: PropTypes.func.isRequired
}

export default DailyFeedbackStatusButtons;