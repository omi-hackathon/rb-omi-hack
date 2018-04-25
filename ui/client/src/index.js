/* eslint react/prop-types: 0 */

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Initialiser from 'initialiser';
import store from 'ducks/configureStore';
import 'normalize.css';
import 'scss/index.scss';

injectTapEventPlugin();

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={Initialiser.history}>
            <div>
                <div className="view-container">
                </div>
            </div>
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
);