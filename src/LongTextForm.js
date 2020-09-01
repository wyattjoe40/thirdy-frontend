import React, { Component } from 'react';

class LongTextForm extends Component {
  constructor(props) {
    super(props)

    this.state = { inputText: props.defaultText ?? '' }

    this.onTextChange = this.onTextChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onTextChange(e) {
    this.setState({ inputText: e.target.value })
  }

  componentDidUpdate(prevProps) {
    if (prevProps.defaultText !== this.props.defaultText) {
      this.setState({ inputText: this.props.defaultText ?? '' })
    }
  }

  onSubmit(e) {
    e.preventDefault()

    this.props.onSubmit(this.state.inputText)
  }

  render() {
    return (
      <div>
        <h3>{this.props.title}</h3>
        <form onSubmit={this.onSubmit} >
          <div className="flex flex-wrap">
            <textarea className="w-full sm:w-4/5 generic-container" disabled={this.props.disabled || this.props.saving} onChange={this.onTextChange} value={this.state.inputText} />
            <input className="btn btn-green w-full sm:w-1/5" disabled={this.props.disabled || this.props.saving} type="submit" value={this.props.saving ? "Saving..." : "Save"} />
          </div>
        </form>
      </div>
    );
  }
}
LongTextForm.defaultProps = {
  disabled: false,
}

export default LongTextForm;