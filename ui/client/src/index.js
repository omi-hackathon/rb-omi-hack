/* eslint react/prop-types: 0 */

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { Redirect, Route, Switch } from 'react-router';
import { isAuthenticated } from './utils/auth';
//import Loader from 'components/loader/loader';
import Header from 'components/header/header';
import Login from 'scenes/login/login';
import Home from 'scenes/home/home';
import registerServiceWorker from 'registerServiceWorker';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Initialiser from 'initialiser';
import store from 'ducks/configureStore';
import 'normalize.css';
import 'scss/index.scss';

injectTapEventPlugin();

const history = Initialiser.history;

const mapStateToProps = state => state;

/*const mapStateToProps = state => ({
    user: state.user,
    fetching: state.fetching,
});*/

const renderRedirect = props => {
    if (isAuthenticated()) {
        if (props.fetching.indexOf('user') === -1) {
            // safe to render component
            const { Component } = props;
            return <Component {...props} />;
        }
        // user object is being fetched
        return 'LOADER'; //<Loader />;
    }
    // unauthenticated, redirect to login
    return (
        <Redirect
            to={{
                pathname: '/login',
                state: { from: props.location },
            }}
        />
    );
};

const PrivateRoute = connect(mapStateToProps, null)(({ component: Component, ...rest }) => (
    <Route {...rest} render={props => renderRedirect(Object.assign(props, rest, { Component }))} />
));

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <div>
                <Route path="/" render={() => isAuthenticated() && <Header />} />
                <div className="view-container">
                    <Switch>
                        <Route exact path="/login" component={Login} />
                        <PrivateRoute exact path="/" component={Home} />
                        <PrivateRoute component={() => <h1>404 - Not Found</h1>} />
                    </Switch>
                </div>
            </div>
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root'),
);

registerServiceWorker();
