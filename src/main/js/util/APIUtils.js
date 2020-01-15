import { API_BASE_URL, POLL_LIST_SIZE, ACCESS_TOKEN } from '../constants';
import axios from 'axios';

//https://habr.com/ru/company/ruvds/blog/477286/

const request = (options, content_type='application/json') => {
    const headers = new Headers({'Content-Type': content_type});

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

export function setSubmissionStatus(body) {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }
    return request({
        url: "/api/admin/submissions/resolve",
        method: 'POST',
        body: body
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
        jwtToken: localStorage.getItem(ACCESS_TOKEN)
    };

    const formData  = new FormData();
    formData.append('file', file);
    formData.append('payload', new Blob([JSON.stringify(json)],
        {type: "application/json"})
    );

    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
    return axios({
        url: url,
        method: 'POST',
        data: formData,
        config: { headers: {
                "Content-Type": "multipart/form-data",
            } }
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

export function loadSubmission(submissionId) {
    if (!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: "/api/admin/submissions/" + submissionId,
        method: 'GET'
    });
}

export function loadProblem(problemId) {
    if (!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: "/api/problems/" + problemId,
        method: 'GET'
    });
}

export function loadMonitorHeader(contestId) {
    if (!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: "/api/monitor/contest/" + contestId,
        method: 'GET'
    });
}

export function loadMonitorAutoGroup(contestId) {
    if (!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: "/api/monitor/contest/" + contestId + "/show",
        method: 'GET'
    });
}

export function loadMonitor(contestId, groupId) {
    if (!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: "/api/monitor/contest/" + contestId + "/group/" + groupId,
        method: 'GET'
    });
}