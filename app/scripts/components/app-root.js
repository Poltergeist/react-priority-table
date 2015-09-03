import {
  Map
}
from 'immutable';
import React from 'react/addons';
import Debug from 'debug';
import Actions from '../actions';
import Component from './Component';
import Immutable from 'immutable';

import Row from './row';
import Result from './result';

import CONFIG from '../constants/config';

let debug = Debug('myApp'),
  Mousetrap;

/*
 * @class AppRoot
 * @extends React.Component
 */
class AppRoot extends Component {
  /*
   * @method constructor
   * @props  properties
   */
  constructor(props) {
    super(props);
    if(window) {
      Mousetrap = require('mousetrap');
      Mousetrap.bind('command+z', event => this.props.actions.undoSelectColumn());
      Mousetrap.bind('command+y', event => {
        event.preventDefault();
        this.props.actions.redoSelectColumn()
      });
    }

  }

  /*
   * @method getChildContext
   * @returns {Object} childContext
   */
  getChildContext() {

    // share only actions with childs
    return {
      actions: this.props.actions
    };
  }


  /*
   * @method undoSelect
   */
  undoSelect() {
    this.getChildContext().actions.undoSelectColumn();
  }

  /*
   * @method redoSelect
   */
  redoSelect() {
    this.getChildContext().actions.redoSelectColumn();
  }


  /*
   * @method render
   * @returns {JSX}
   */
  render() {
    let selected = this.props.state.get('selected'),
      rows = this.props.state.get('rows') || Immutable.Map(),
      result = this.props.state.get('selected') || Immutable.Map();
    debug('render <AppRoot/>');
    debug(this.context);
    return <div className="appRoot">
      <h1>{CONFIG.title}</h1>
      <table className = "priority-table">
      {rows.map(function(item, key) {
          return <Row key={key} row={item} rowKey={key} selected={selected} />;
        })}
      </table>
      <Result result = {result} />
    </div>;
  }
}

// Context types validation
AppRoot.childContextTypes = Component.contextTypes;

// Prop types validation
AppRoot.propTypes = {
  actions: React.PropTypes.instanceOf(Actions).isRequired,
  state: React.PropTypes.instanceOf(Map).isRequired
};

export default AppRoot;
