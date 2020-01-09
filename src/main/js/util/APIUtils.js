import { API_BASE_URL, POLL_LIST_SIZE, ACCESS_TOKEN } from '../constants';

const request = (options) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
    })

    if(localStorage.getItem(ACCESS_TOKEN)) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
    }

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);

    return fetch(options.url, options)
        .then(response =>
            response.json().then(json => {
                if(!response.ok) {
                    return Promise.reject(json);
                }
                return json;
            })
        );
};

export function getUserProfile(username) {
    return request({
        url: "/users/" + username,
        method: 'GET'
    });
}

export function getCurrentUser() {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: "/users/me",
        method: 'GET'
    });
}

export function loadContests() {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: "/api/contests",
        method: 'GET'
    });
}

export function loadProblemsFromContest(contestId) {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: "/api/contests/" + contestId.toString(),
        method: 'GET'
    });
}

export function uploadSubmit(file, url) {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    let json = {
        language: 'C++',
        code: file.toString(),
        jwtToken: localStorage.getItem(ACCESS_TOKEN)
    };

    return request({
        url: url,
        method: 'POST',
        body: JSON.stringify(json)
    });
}

export function loadAdminContests() {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: "/api/admin/contests",
        method: 'GET'
    });
}

export function loadAdminContestSubmissions(contestId) {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: "/api/admin/contest/" + contestId + "/submissions",
        method: 'GET'
    });
}
