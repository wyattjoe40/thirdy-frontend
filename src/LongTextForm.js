import React, { Component } from 'react';

class LongTextForm extends Component {
  constructor(props) {
    super(props)

    this.state = {inputText: props.defaultText ?? ''} 
    
    this.onTextChange = this.onTextChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onTextChange(e) {
    this.setState({inputText: e.target.value})
  }

  componentDidUpdate(prevProps) {
    if (prevProps.defaultText !== this.props.defaultText) {
      this.setState({inputText: this.props.defaultText ?? ''})
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
          <div className="flex">
            <textarea disabled={this.props.disabled} className="flex-1 generic-container" onChange={this.onTextChange} value={this.state.inputText} />
            <input disabled={this.props.disabled} className="btn btn-green" type="submit" value="Save" />
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