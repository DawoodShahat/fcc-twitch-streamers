import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import TwitchApp from './components/TwitchApp/TwitchApp';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<TwitchApp />, document.getElementById('root'));

if(module.hot)
    module.hot.accept();

registerServiceWorker();
