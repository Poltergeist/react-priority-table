import App from './app';
import Debug from 'debug';

var attachElement = document.querySelector('.main-container');

var state = {
};

var app;

Debug.enable('myApp*');

// Create new app and attach to element
app = new App({
  state: state
});

app.renderToDOM(attachElement);
