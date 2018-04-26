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
                url: `/api/${url}`,
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
        return this.request('GET', 'licenses');
    }

    buyLicense(userID, ISRC, licenseType) {
        return this.request('POST', 'license/purchase', null, {
            userID,
            ISRC,
            licenseType,
        });
    }

    linkVideo(licenseID, videoID) {
        return this.request('POST', `license/${licenseID}/link`, null, {
            videoID,
        });
    }
}

export default new API();
