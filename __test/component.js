const React = require('react');
const { renderReact } = require('hypernova-react');

function MyComponent(props) {
  return React.createElement('div', null, 'Hello, ', props.name, '!');
}

module.exports = renderReact('MyComponent', MyComponent);
