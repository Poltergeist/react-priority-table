import {Map} from 'immutable';
import React from 'react/addons';
import Debug from 'debug';
import Component from './Component';

import Column from './column'

var debug = Debug('myApp:Row');

/*
 * @class Row
 * @extends React.Component
 */
class Row extends Component {


  /*
   * @method render
   * @returns {JSX}
   */
  render () {
    var row = this.props.row,
      columns = row,
      rowKey = this.props.rowKey,
      selected = this.props.selected;

    debug('render <Row/>');
    debug('props', row);
    debug(this.refs);

    debug(selected.toJS());
    return <tr className="row">
      <td>{rowKey}</td>
      {row.map(function (item, key) {
        return <Column key={key} column={item} columnKey={key} rowKey={rowKey} selected={selected.get(key) == rowKey}/>;
      })}
    </tr>;
  }
}

// Prop types validation
Row.propTypes = {
  row: React.PropTypes.instanceOf(Map).isRequired
};

export default Row;
