import React from 'react';
import Dialog from '../dialog';

import './index.scss';


export default class Select extends React.Component {
  state = {
    selectedOption: this.props.options[0] || {},
    visible: false
  };

  onChange = (e) => {
    const selectedOption = this.props.options.find(option => option.value === e.target.value);
    this.setState({ visible: true,  selectedOption });
  };

  onOk = () => {
    this.setState({ visible: false });
  };

  render() {
    const {
      options = []
    } = this.props;

    return (
      <React.Fragment>
        <select value={this.state.selectedOption.value} className="select-wrapper" name="menu" onChange={this.onChange}>
          {
            options.map(option => <option key={option.value} value={option.value}>{option.label}</option>)
          }
        </select>
        <Dialog
          visible={this.state.visible}
          onOk={this.onOk}
        >
          { this.state.selectedOption.label } has been activated!
        </Dialog>
      </React.Fragment>
    );
  }
}
