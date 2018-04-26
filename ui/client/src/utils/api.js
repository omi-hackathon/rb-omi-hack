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

    buyLicense(user_id, isrc, license_type) {
        return this.request('POST', 'license/purchase', null, {
            user_id,
            isrc,
            license_type,
        });
    }

    registerVideo(user_id, link, license_id) {
        return this.request('POST', 'videos/register', null, {
            user_id,
            link,
            license_id,
        });
    }
}

export default new API();
