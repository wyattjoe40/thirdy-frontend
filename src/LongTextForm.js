import React, { Component } from 'react';

class LongTextForm extends Component {
  constructor(props) {
    super(props)

    this.state = { inputText: props.defaultText ?? '', editable: false, textAtEditTime: '' }

    this.onTextChange = this.onTextChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.editButtonClicked = this.editButtonClicked.bind(this)
    this.cancelButtonClicked = this.cancelButtonClicked.bind(this)
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

    this.setState({ saving: true })
    this.props.onSubmit(this.state.inputText, (err) => {
      this.setState({ saving: false })
      if (err) {
        alert(err)
      } else {
        this.setState({ editable: false})
      }
    })
  }

  editButtonClicked(e) {
    e.preventDefault()

    this.setState((state) => ({ editable: true, textAtEditTime: state.inputText }))
  }

  cancelButtonClicked(e) {
    e.preventDefault()

    this.setState((state) => ({ editable: false, inputText: state.textAtEditTime }))
  }

  render() {
    return (
      <div>
        {this.props.title && <h3>{this.props.title}</h3>}
        {this.state.editable ?
          <form onSubmit={this.onSubmit} >
            <div className="flex flex-wrap">
              <textarea className="w-full sm:w-4/5 generic-container" disabled={this.props.disabled || this.props.saving} onChange={this.onTextChange} value={this.state.inputText} />
              <input className="btn btn-green w-full sm:w-1/10" disabled={this.props.disabled || this.state.saving} type="submit" value={this.state.saving ? "Saving..." : "Save"} />
              <button onClick={this.cancelButtonClicked} className="btn btn-orange w-full sm:w-1/10" disabled={this.props.disabled || this.state.saving} >Cancel</button> 
            </div>
          </form>
          :
          <div className="flex flex-wrap">
            <p className="w-full sm:w-4/5 generic-container">{this.state.inputText}</p>
            <button className="btn btn-gray w-full sm:w-1/5" onClick={this.editButtonClicked} disabled={this.props.disabled}>Edit</button>
          </div>
        }
      </div>
    );
  }
}
LongTextForm.defaultProps = {
  disabled: false,
}

export default LongTextForm;