import { API_BASE_URL, PLANETS_API } from './api-constants';
import { apiCall } from './api-utils';

// authenticate
export const authenticate = ({ username, password }) => {
    let auth = new Promise((resolve, reject) => {
        debugger;
        if (
            username.toLowerCase().indexOf('luke') >= 0 &&
            password === '19BBY'
        )
            resolve({ status: 200, data: 'authenticated' });
        else
        debugger;
            reject({ status: 400, error: { code: 400, message: 'user not found!' } });
    });
    return auth;
};

// search api
export const getSearchResults = searchText =>
    apiCall(`${API_BASE_URL}${PLANETS_API}?search=${searchText}`);
