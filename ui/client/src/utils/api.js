import axios from 'axios';
import { getAuthHeader } from './auth';

class API {
    constructor() {
        this.headers = {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        };
    }

    request(method, url, params, data) {
        return axios
            .request({
                method,
                url: `http://34.252.128.0:3000/v1/${url}`,
                params,
                data,
                headers: Object.assign(this.headers, {
                    Authorization: getAuthHeader(),
                }),
            })
            .then(response => response.data)
            .catch(error => {
                throw error.response;
            });
    }

    getRecordings() {
        return this.request('GET', 'recordings');
    }

    getLicenses() {
        return this.request('GET', 'licenses', {
            userID: window.GoogleAuth.currentUser.get().El || window.GoogleAuth.currentUser.get().Eea,
        });
    }

    buyLicense(userID, ISRC, licenseType) {
        return this.request('POST', 'licenses/purchase', null, {
            userID,
            ISRC,
            licenseType,
        });
    }

    linkVideo(videoID, licenseID) {
        return this.request('POST', `licenses/${licenseID}/link`, null, {
            videoID,
        });
    }
}

export default new API();
