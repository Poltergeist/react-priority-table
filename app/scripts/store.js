import {
  EventEmitter
}
from 'events';
import Immutable from 'immutable';
import Debug from 'debug';
import _ from 'lodash';

import {
  CHANGE, COLUMN
}
from './constants/consts';

var debug = Debug('myApp:store');

/*
 * @class Store
 */
class Store extends EventEmitter {

  /*
   * @constructs Store
   * @extends events.EventEmitter
   * @param {Object} dispatcher
   * @param {Object} [state]
   */
  constructor(dispatcher, state) {
    super();

    var _this = this;

    if (!dispatcher) {
      debug(new Error('Store: dispatcher is required'));
    }

    if (state) {
      debug('app is created with initial state', state);
    }

    state = state || {};
    state = _.merge({}, Store.defaultState, state);

    // Register handlers
    dispatcher.register(function(action) {
      if (action.actionType === COLUMN.SELECT_COL) {
        _this.onSelectColumn(action.item);

      }
      if (action.actionType === COLUMN.UNDO_SELECT) {
        _this.undoSelectColumn();
      }
      if (action.actionType === COLUMN.REDO_SELECT) {
        _this.redoSelectColumn();
      }
    });

    debug('store is loaded with state', state);

    // Turn state to immutable
    _this.state = Immutable.fromJS(state);
    _this.history = [];
    _this.redo = [];
  }

  /*
   * @method getState
   * @returns {Immutable.Map} - state
   */
  getState() {
      return this.state;
    }
    /*
     * @method undoSelectColumn
     */
  undoSelectColumn() {
    if (this.history.length === 0) {
      return;
    }
    this.redo.push(this.state);
    this.state = this.history.pop();
    this.emit(CHANGE);
  }

  /*
   * @method redoSelectColumn
   */
  redoSelectColumn() {
      if (this.redo.length === 0) {
        return;
      }
      this.history.push(this.state);
      this.state = this.redo.pop();
      this.emit(CHANGE);
    }
    /*
     * @method onSelectColun
     * @param {Object} item
     */
  onSelectColumn(item) {
    let immutableSelected = this.state.get('selected').map((row) => row == item.row ? null : row),
      immutableRow = Immutable.fromJS(item.row),
      newState = this.state.updateIn(['selected'], selected => immutableSelected);

    newState = newState.updateIn(['selected', item.col], selected => immutableRow);
    if(Immutable.is(newState, this.state) === true) {
      debug('no change');
      return;
    }
    this.history.push(this.state);
    this.redo = [];

    this.state = newState;
    this.emit(CHANGE);
  }
}

// Default state
Store.defaultState = {
  rows: {
    race: {
      'a': {
        label: 'human'
      },
      'b': {
        label: 'troll'
      },
      'c': {
        label: 'ork'
      }
    },
    funds: {
      'a': {
        label: '5000'
      },
      'b': {
        label: '10000'
      },
      'c': {
        label: '1000'
      }
    },
    skills: {
      'a': {
        label: '1'
      },
      'b': {
        label: '5'
      },
      'c': {
        label: '10'
      }
    }

  },
  selected: {
    a: null,
    b: null,
    c: null
  }
};

export default Store;
