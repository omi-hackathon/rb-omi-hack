import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { isAuthenticated } from '../../utils/auth';
import { authenticate, logout } from 'ducks/modules/user';
import PropTypes from 'prop-types';
import './header.scss';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            showMenu: false,
        };
        this.updateSigninStatus = this.updateSigninStatus.bind(this);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside.bind(this));
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside.bind(this));
        window.gapi.load('client', () => {
            window.gapi.client
                .init({
                    //0J5EWwHy0WGuPPGxOc7PGzsH
                    apiKey: 'AIzaSyAECuUwvN4tfl9qtL1QzQjh8iZVtUAcjLc',
                    clientId: '472352541870-i5vs8e6jhjohc3dpa25tevm3r999jl6n.apps.googleusercontent.com',
                    scope: 'https://www.googleapis.com/auth/youtube',
                    discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest'],
                })
                .then(async () => {
                    window.GoogleAuth = window.gapi.auth2.getAuthInstance();
                    // console.log(GoogleAuth);
                    // console.log(GoogleAuth.isSignedIn);
                    // console.log(window.GoogleAuth.isSignedIn.get());
                    // console.log(window.GoogleAuth.currentUser.get());
                    // console.log(GoogleAuth.getInitialScopes());

                    // updateSigninStatus(GoogleAuth.isSignedIn.get());
                    // GoogleAuth.signIn();

                    const signedInStatus = window.GoogleAuth.isSignedIn.get();
                    console.log(signedInStatus);
                    if (signedInStatus) {
                        const user = window.GoogleAuth.currentUser.get().w3;
                        this.setState({ user, redirect: true });
                        //await api.postUser(user);
                        /*if (location.href.indexOf('login') > 0) {
                            location.href = '/';
                        }*/
                    }

                    /*if (!signedInStatus && location.href.indexOf('login') < 0) {
                        location.href = '/login';
                    }*/

                    // Listen for sign-in state changes.
                    window.GoogleAuth.isSignedIn.listen(this.updateSigninStatus);
                })
                .catch(e => {
                    console.log(e);
                });
        });
    }

    handleClickOutside(e) {
        if (this.self && !this.self.contains(e.target)) {
            this.setState({
                showMenu: false,
            });
        }
    }

    showMenu() {
        this.setState({ showMenu: true });
    }

    async login(e) {
        e.preventDefault();
        window.GoogleAuth.signIn();
        //this.setState({ redirect: true });
    }

    logout() {
        window.GoogleAuth.signOut();
        this.props.logout();
        //this.setState({ user: null });
    }

    updateSigninStatus(isSignedIn) {
        console.log('signed in: ' + isSignedIn);
        const user = window.GoogleAuth.currentUser.get().w3;
        console.log(user);
        this.setState({ user, redirect: true, showMenu: false });
    }

    render() {
        return (
            <header className="site-header">
                <div className="title">OMI Hackathon</div>
                <nav>
                    <ul>
                        {isAuthenticated() && (
                            <li ref={ref => (this.self = ref)}>
                                <strong onClick={e => this.showMenu(e)}>{this.state.user.ofa}</strong>
                                <img src={this.state.user.Paa} alt="User avatar" onClick={e => this.showMenu(e)} />
                                <div className="menu-dock">
                                    <div className={'menu' + (this.state.showMenu ? ' show' : '')}>
                                        <ul>
                                            <li>
                                                <Link to="/licenses">View Your Licenses</Link>
                                            </li>
                                            <li>
                                                <a onClick={e => this.logout(e)}>Logout</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </li>
                        )}
                        {!isAuthenticated() && (
                            <li>
                                <a onClick={e => this.login(e)}>
                                    <small>log in</small>
                                </a>
                            </li>
                        )}
                    </ul>
                </nav>
            </header>
        );
    }
}
/*
            <div className="global-header">
                <p>OMI Hackathon</p>
                <div className={'loader' + (this.props.visible ? ' show' : '')} />
            </div>
        );
*/
Header.propTypes = {
    user: PropTypes.shape({
        name: PropTypes.string,
    }),
    visible: PropTypes.bool.isRequired,
    logout: PropTypes.func,
    authenticate: PropTypes.func,
};

const mapStateToProps = state => ({
    visible: state.fetching.length > 0,
});

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(logout()),
    authenticate: state => dispatch(authenticate(state)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));
