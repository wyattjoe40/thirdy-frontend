import React, { Component } from 'react';

class DailyFeedbackStatusButtons extends Component {
  render() {
    return (
      <div className="flex items-center">
        <button disabled={this.props.saving} onClick={() => this.props.onUpdateStatus('completed')} className="btn btn-green">Complete</button>
        <button disabled={this.props.saving} onClick={() => this.props.onUpdateStatus('skipped')} className="btn btn-orange">Skip</button>
        { this.props.saving && <p>Saving...</p>}
      </div>
    );
  }
}

export default DailyFeedbackStatusButtons;