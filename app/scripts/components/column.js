import {Map} from 'immutable';
import React from 'react/addons';
import Debug from 'debug';
import Component from './Component';

var debug = Debug('myApp:Column');

/*
 * @class Row
 * @extends React.Component
 */
class Column extends Component {

  selectColumn () {
    debug('selectColumn');
    debug(this.props.rowKey, this.props.columnKey);
    this.context.actions.selectPriority({
      row: this.props.rowKey,
      col: this.props.columnKey
    });
  }

  /*
   * @method render
   * @returns {JSX}
   */
  render () {
    var column = this.props.column,
      className = this.props.selected ? 'column selected' : 'column'

    debug('render <Column/>');

    return <td className={className} onClick={this.selectColumn.bind(this)}>{column.get('label')}</td>;
  }
}

// Prop types validation
Column.propTypes = {
  column: React.PropTypes.instanceOf(Map).isRequired
};

export default Column;
