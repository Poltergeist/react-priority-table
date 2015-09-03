import {COLUMN} from './constants/consts';

var debug = require('debug')('myApp:actions');

/*
 * @class Actions
 */
class Actions {

  /*
   * @constructs Actions
   * @param {Object} dispatcher
   */
  constructor (dispatcher) {
    this.dispatcher = dispatcher;
  }

  redoSelectColumn () {
    this.dispatcher.dispatch({
      actionType: COLUMN.REDO_SELECT
    })
  }

  undoSelectColumn () {
    this.dispatcher.dispatch({
      actionType: COLUMN.UNDO_SELECT
    })
  }
  /*
   * @method addCartItem
   * @param {Object} item
   */
  selectPriority (item) {
    debug('COLUMN.SELECT_COL', item);

    this.dispatcher.dispatch({
      actionType: COLUMN.SELECT_COL,
      item: item
    });
  }
}

export default Actions;
