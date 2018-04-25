import createHistory from 'history/createBrowserHistory';

class Initialiser {
    constructor() {
        this.history = createHistory();
        this.initialState = {
            fetching: [],
            user: {},
        };
    }
}

export default new Initialiser();
