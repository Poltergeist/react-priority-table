import {jsdom} from 'jsdom';
// init jsdom
global.document = jsdom();
global.window = global.document.defaultView;
global.navigator = global.window.navigator;

const React = require('react/addons');
const TestUtils = React.addons.TestUtils;

export default createComponent;

function createComponent(component, props, ...children) {
  const shallowRenderer = TestUtils.createRenderer();
  shallowRenderer.render(React.createElement(component, props, children.length > 1 ? children : children[0]));
  return shallowRenderer.getRenderOutput();
}
