import React, { Component } from 'react';

class TabMenu extends Component {
  constructor(props) {
    super(props)

    if (this.props.children && this.props.children.length > 0) {
      this.state = { selectedTab: this.props.children[0].props.title }
    }

    this.onTabSelected = this.onTabSelected.bind(this)
    this.isSelected = this.isSelected.bind(this)
  }

  onTabSelected(e) {
    e.preventDefault()
    this.setState({ selectedTab: e.target.innerText })
  }

  isSelected(child) {
    return child.props.title === this.state.selectedTab
  }

  render() {
    const allTabItemStyle = "rounded-t-md tab-menu-item border "
    const selectedTabItemStyle = allTabItemStyle + "tab-item-selected"
    const unselectedTabItemStyle = allTabItemStyle + "tab-item-unselected border-transparent hover:border-gray-300"
    return (
      <div>
        { this.props.title && <h1>{this.props.title}</h1> }
        <ul className="tab-menu w-full flex flex-wrap border-b">
          {this.props.children.map((child) => (
            <li className={`${this.isSelected(child) ? selectedTabItemStyle : unselectedTabItemStyle }`}>
              <button onClick={this.onTabSelected}  className="px-4 py-2 outline-none">{child.props.title}</button>
            </li>
          ))}
        </ul>
        <div className="mt-2">
          { this.props.children.filter((child) => this.isSelected(child)) }
        </div>
      </div>
    );
  }
}

export default TabMenu;