import React, { Component } from 'react';

class NavRow extends Component {
  render() {
    const todayStyling = this.props.isToday ? "border-blue-600" : ""
    const selectedStyling = this.props.isSelected ? "bg-blue-200" : ""
    const disabledStyling = this.props.isDisabled ? "bg-gray-200 cursor-not-allowed" : "hover:bg-blue-600 hover:text-white"
    return (
      <button className={`generic-container justify-between flex ${todayStyling} ${selectedStyling} ${disabledStyling}`} disabled={this.props.isDisabled} onClick={this.props.onClick} >
        {this.props.children}
      </button>
          /*
        <div className={`hover:bg-blue-600 hover:text-white generic-container justify-between flex ${todayStyling} ${selectedStyling}`}>
        </div>
        */
    );
  }
}

export default NavRow;