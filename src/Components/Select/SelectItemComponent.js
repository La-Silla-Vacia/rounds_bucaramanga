'use strict';

import { h, render, Component } from 'preact';

import s from './Select.css';

class SelectItemComponent extends Component {
  constructor() {
    super();
    this.state = {
      isSelected: false
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.callback(this.props.value);
  }

  render() {
    return (
      <button
        className={s.option}
        onClick={this.handleClick.bind(this)}>
        {this.props.children}
      </button>
    );
  }
}

SelectItemComponent.displayName = 'SelectItemComponent';

// Uncomment properties you need
// SelectItemComponent.propTypes = {};
// SelectItemComponent.defaultProps = {};

export default SelectItemComponent;
