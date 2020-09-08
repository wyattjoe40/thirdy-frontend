import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function CompletedStatus(props) {
  var icon
  var text
  switch (props.status) {
    case "complete":
      text = "Complete"
      icon = "check-circle"
      break;
    case "abandoned":
      text = "Abandoned"
      icon = "times-circle"
      break;
    default:
      text = "N/A"
      icon = "question"
      break;
  }
  return (<div><FontAwesomeIcon icon={icon} className={`status ${props.status}`}/><span >{text}</span></div>)
}

export default CompletedStatus;