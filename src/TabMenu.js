import React, { Component } from 'react';
import withTabContext from './withTabContext';

class TabMenu extends Component {
  constructor(props) {
    super(props)

    const previouslySelectedTab = this.props.tabContext.selectedTabs[this.props.title];
    if (previouslySelectedTab) {
      console.log("found previously selected tab")
      this.state = { selectedTab: previouslySelectedTab }
    } else {
      console.log("no previously selected tab")
      if (this.props.children) {
        const validChildren = this.props.children.filter(child => child)
        if (validChildren.length > 0) {
          this.state = { selectedTab: validChildren[0].props.title }
        }
      }
    }

    this.onTabSelected = this.onTabSelected.bind(this)
    this.isSelected = this.isSelected.bind(this)
  }

  onTabSelected(e) {
    e.preventDefault()
    const selectedTab = e.target.innerText
    this.setState({ selectedTab: selectedTab})
    console.log("Settings state: " + this.props.title + ": " + selectedTab)
    this.props.tabContext.setSelectedTab(this.props.title, selectedTab)
  }

  isSelected(child) {
    return child.props.title === this.state.selectedTab
  }

  render() {
    const allTabItemStyle = "rounded-t-md tab-menu-item border "
    const selectedTabItemStyle = allTabItemStyle + "tab-item-selected"
    const unselectedTabItemStyle = allTabItemStyle + "tab-item-unselected border-transparent hover:border-gray-300"
    return (
      <div className={this.props.className}>
        { this.props.title && <h1>{this.props.title}</h1> }
        <ul className="tab-menu w-full flex flex-wrap border-b">
          {this.props.children.filter(child => child).map((child) => (
            <li key={child.props.title} className={`${this.isSelected(child) ? selectedTabItemStyle : unselectedTabItemStyle }`}>
              <button onClick={this.onTabSelected}  className="px-4 py-2 focus:outline-none">{child.props.title}</button>
            </li>
          ))}
        </ul>
        <div className="mt-2">
          { this.props.children.filter(child => child).filter((child) => this.isSelected(child)) }
        </div>
      </div>
    );
  }
}

export default withTabContext(TabMenu);