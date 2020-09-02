import React, { Component } from 'react';

class TabMenu extends Component {
  constructor(props) {
    super(props)

    if (this.props.children && this.props.children.length > 0) {
      this.state = { selectedTab: this.props.children[0].props.title }
    }

    this.onTabSelected = this.onTabSelected.bind(this)
  }

  onTabSelected(e) {
    this.setState({ selectedTab: e.target.innerText })
  }

  render() {
    return (
      <div>
        { this.props.title && 
        <h1>{this.props.title}</h1> }
        <ul className="flex">
          {this.props.children.map((child) => (
            <li className="p-2"><button className="p-1 bg-green-500" onClick={this.onTabSelected}>{child.props.title}</button></li>
          ))}
        </ul>
        { this.props.children.filter((child) => child.props.title === this.state.selectedTab) }
      </div>
    );
  }
}

export default TabMenu;