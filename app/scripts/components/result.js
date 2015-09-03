import {Map} from 'immutable';
import React from 'react/addons';
import Debug from 'debug';
import Component from './Component';

var debug = Debug('myApp:Result');

/*
 * @class Result
 * @extends React.Component
 */
class Result extends Component {


  /*
   * @method render
   * @returns {JSX}
   */
  render () {
    var result = Map({});

    debug('render <Result/>');

    this.props.result.forEach((value, key) => {
      result = result.set(value, key);
    });
    result = result.delete(null);

    return <ul>
      {result.map((key, value) => {
        return <li> {value} = {key} </li>
      })}
    </ul>;
  }
}

// Prop types validation
Result.propTypes = {
  result: React.PropTypes.instanceOf(Map).isRequired
};

export default Result;
