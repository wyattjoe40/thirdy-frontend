import React, { Component } from 'react';
import LongTextForm from './LongTextForm';

class EditableLongTextForm extends Component {
  construtor(props) {
    super(props)

    this.state = { editabled: false }
  }

  render() {
    return (
      <div>
        {this.props.title && <h3>{this.props.title}</h3>}
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

export default EditableLongTextForm;