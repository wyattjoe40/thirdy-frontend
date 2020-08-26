import React, { Component } from 'react';
import NavRow from './NavRow'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class DailyFeedbackRow extends Component {
  constructor(props) {
    super(props)

    this.onRowClicked = this.onRowClicked.bind(this)
  }

  onRowClicked(e) {
    this.props.onClick(this.props.day, e)
  }
  // day, dailyFeedback, status
  render() {
    var icon
    switch(this.props.status) {
      case 'completed':
        icon = <FontAwesomeIcon icon='check-circle' />
        break;
      case 'skipped':
        icon = <FontAwesomeIcon icon='times-circle' />
        break;
      case 'none':
      default:
        icon = undefined
    }
    return (
      <NavRow isDisabled={this.props.isDisabled} isSelected={this.props.isSelected} onClick={this.onRowClicked} isToday={this.props.isToday} >
        <p className="self-start">{this.props.day}</p>
        <div>
          {this.props.feedbackText && <FontAwesomeIcon className="mr-1" icon="comment-alt"/>}
          {icon}
        </div>
      </NavRow>
    );
  }
}

export default DailyFeedbackRow;