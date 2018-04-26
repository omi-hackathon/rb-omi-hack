export function isAuthenticated() {
    return window.GoogleAuth ? window.GoogleAuth.isSignedIn.get() : false;
}

export function getAuthHeader() {
    if (window.GoogleAuth) {
        const user = window.GoogleAuth.currentUser.get();
        if (user) {
            return 'Bearer ' + user.Zi.access_token;
        }
    }
    return null;
}
