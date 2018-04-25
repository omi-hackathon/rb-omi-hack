import createHistory from 'history/createBrowserHistory';

class Initialiser {
    constructor() {
        this.history = createHistory();
        this.initialState = {};
    }
}

export default new Initialiser();