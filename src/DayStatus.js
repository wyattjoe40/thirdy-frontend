import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class DayStatus extends Component {
  render() {
    var statusDisplayText
    var statusDisplayIcon
    var statusDisplayColor = ""
    switch (this.props.status) {
      case 'completed':
        statusDisplayText = "Completed"
        statusDisplayIcon = "check-circle"
        statusDisplayColor = "text-green-600"
        break;
      case 'skipped':
        statusDisplayText = "Skipped"
        statusDisplayIcon = "times-circle"
        statusDisplayColor = "text-orange-600"
        break;
      default:
        statusDisplayText = "Not Completed"
        statusDisplayIcon = "question"
        break;
    }
    return (
      <p>Status: <FontAwesomeIcon className={`${statusDisplayColor}`} icon={statusDisplayIcon}/> {statusDisplayText}</p>
    )
  }
}


export default DayStatus;