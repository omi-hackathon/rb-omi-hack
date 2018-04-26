import React, { Component } from 'react';
import { Redirect } from 'react-router';
import Header from '../../components/header/header';
import './login.scss';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
        };
    }
    componentDidMount() {
        // console.log(window.GoogleAuth.isSignedIn.get());
        console.log('MOUNTED AuthenticationWrapper');
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
                    if (signedInStatus) {
                        const user = window.GoogleAuth.currentUser.get();
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

    async updateSigninStatus(isSignedIn) {
        console.log('============ ', isSignedIn);
        console.log(window.GoogleAuth.currentUser.get());
        const user = window.GoogleAuth.currentUser.get();
        this.setState({ user, redirect: true });
    }

    signIn() {
        window.GoogleAuth.signIn();
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={{ pathname: '/' }} />;
        }
        return (
            <div>
                <Header />
                <button className="login-button" onClick={() => this.signIn()}>
                    Youtube Login
                </button>
            </div>
        );
    }
}

export default Login;
