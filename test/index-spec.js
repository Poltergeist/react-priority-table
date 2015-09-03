import assert from 'assert';
import AppRoot from '../app/scripts/components/app-root';
import createComponent from './utils/create-component';
import Actions from '../app/scripts/actions';
import Immutable from 'immutable';
import DATA from './fixtures/app-root';
import Sinon from 'sinon';
import CONFIG from '../app/scripts/constants/config';

describe('Generator', () => {
  let component,
    content = {
      actions: new Actions(),
    state: Immutable.fromJS(DATA)
    };
  beforeEach(() => {
    component = createComponent(AppRoot, content);
  });
  it('has the right class name', () => {
    let className = component.props.className;
    assert.equal(className, 'appRoot');
  });
  it('has the right title', () => {
    let title = component.props.children[0].props.children;
    assert.equal(CONFIG.title, title);
  });
  it('contains a table', () => {
    let table = component.props.children[1].type;
    assert.equal('table', table);
  });
  it('contains the result', () => {
    let result = component.props.children[2].props.result;
    assert.ok(result);
  });
});
