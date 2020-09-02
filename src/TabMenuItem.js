import React, { Component } from 'react';
import PropTypes from 'prop-types'

class TabMenuItem extends Component {
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

TabMenuItem.propTypes = {
  title: PropTypes.string.isRequired
}

export default TabMenuItem;