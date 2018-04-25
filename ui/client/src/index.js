/* eslint react/prop-types: 0 */

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Route, Redirect, Switch } from 'react-router';
import { connect } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Initialiser from 'initialiser';
import store from 'ducks/configureStore';
import 'normalize.css';
import 'scss/index.scss';

injectTapEventPlugin();

const mapStateToProps = state => state;

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={Initialiser.history}>
            <div>
                <div className="view-container">
                    <Switch>
                        <PrivateRoute component={() => <h1>404 - Not Found</h1>} />
                    </Switch>
                </div>
            </div>
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
);