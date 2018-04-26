export function isAuthenticated() {
    return window.GoogleAuth ? window.GoogleAuth.isSignedIn.get() : false;
}

export function getAuthHeader() {
    return 'Bearer ' + window.GoogleAuth.currentUser.get().Zi.access_token;
}
