import React, { Component } from 'react';

class TestingFlex extends Component {
  render() {
    return (
      <div className="container flex flex-row h-screen">
        <div className="sidebar">Sidebar</div>
        <div className="content">Content</div>
      </div>
    );
  }
}

export default TestingFlex;