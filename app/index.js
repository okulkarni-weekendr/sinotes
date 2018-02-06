import 'bootstrap/dist/css/bootstrap.min.css';
import 'semantic-ui-css/semantic.css';
import '../src/styles/styles.scss';
// import './index.css';
import ReactDOM from 'react-dom';
import React from 'react';
import App from './components/App';
import 'draft-js-image-plugin/lib/plugin.css';

ReactDOM.render(<App />, document.getElementById('app'));
