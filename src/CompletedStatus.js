import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function CompletedStatus({className, status}) {
  var icon
  var text
  switch (status) {
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
  return (<div className={className}><FontAwesomeIcon icon={icon} className={`status ${status}`}/><span className="ml-2">{text}</span></div>)
}

export default CompletedStatus;