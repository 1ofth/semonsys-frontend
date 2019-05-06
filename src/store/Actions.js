import {
    LOGIN_SUCCEED,
    LOGOUT,
    REGISTRATION_COMPLETED,
    REGISTRATION_FAILED,
    WARNING, COMPOSITE_DATA_LOADED, SINGLE_DATA_LOADED, CLEAN, CHART_DATA_LOADED
} from "./States";
import history from "../History";
import {LOGIN_URL, LOGOUT_URL, REFRESH_TOKENS_URL, REGISTRATION_URL} from "../ApiUrls";
import {MAIN_PAGE} from "../Views";

export function makeWarning(message) {
    return {
        type: WARNING,
        payload: message
    }
}

export function cleanStore(toRemove) {
    return {
        type: CLEAN,
        payload: toRemove
    }
}

export function login(login, password) {
    return (dispatch) => {
        let data = new URLSearchParams();
        data.append('login', login);
        data.append('password', password);

        fetch(LOGIN_URL, {
            method: 'POST',
            body: data,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Network response was not ok.');
        })
            .then(response => {
                window.sessionStorage.setItem('isAuthorised', 'true');
                window.sessionStorage.setItem('login', login);
                window.sessionStorage.setItem('accessToken', response.accessToken);
                window.sessionStorage.setItem('refreshToken', response.refreshToken);
                window.sessionStorage.setItem('expires_in', response.expires_in);

                history.push(MAIN_PAGE);

                dispatch({
                    type: LOGIN_SUCCEED,
                    payload: login
                });
            })
            .catch(error => {
                dispatch({
                    type: WARNING,
                    payload: 'There has been a problem while logging: ' + error.message
                });
            });
    }
}

export function logout() {
    refreshTokens();
    return (dispatch) => {
        fetch(LOGOUT_URL, {
            method: 'POST',
            body: '',
            headers: {
                'Authorization': 'Bearer ' + window.sessionStorage.getItem('accessToken'),
                'Content-Type': 'application/x-www-form-urlencoded'
            }

        }).then(() => {
            dispatch({
                type: LOGOUT
            });
        })
            .catch(error => {
                dispatch({
                    type: WARNING,
                    payload: 'There has been a problem while fetching: ' + error.message
                });
            });
    }
}

function refreshTokens() {
    if (Math.round((new Date()).getTime() / 1000) >= window.sessionStorage.getItem('expires_in')) {
        let data = new URLSearchParams();
        data.append('refreshToken', window.sessionStorage.getItem('refreshToken'));

        fetch(REFRESH_TOKENS_URL, {
            method: 'POST',
            body: data,
            headers: {
                'Authorization': 'Bearer ' + window.sessionStorage.getItem('accessToken'),
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Network response was not ok.');
        }).then(response => {
            window.sessionStorage.setItem('accessToken', response.accessToken);
            window.sessionStorage.setItem('refreshToken', response.refreshToken);
            window.sessionStorage.setItem('expires_in', response.expires_in);
        })
            .catch(error => {
                console.log(error);
            });
    }
}

export function loadData(url, group) {
    refreshTokens();
    return (dispatch) => {
        fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + window.sessionStorage.getItem('accessToken'),
            }
        }).then((response) => {
            return response.json()
        }).then((json) => {
            console.log('Requested url was ' + url);
            let reducer = SINGLE_DATA_LOADED;
            if (url.search('/comp/identifiers') !== -1) {
                reducer = COMPOSITE_DATA_LOADED;
            } else if (url.search('time=') !== -1) {
                reducer = CHART_DATA_LOADED;
            }
            dispatch({
                type: reducer,
                group: group,
                payload: json
            });
        }).catch(error => {
            dispatch({
                type: WARNING,
                payload: 'There has been a problem while fetching: ' + error.message
            });
        });
    }
}

export function register(login, password, email) {
    refreshTokens();
    return (dispatch) => {
        if ((String)(login).length < 5) {
            dispatch({
                type: WARNING,
                payload: 'Login is too short. It should have at least 5 symbols'
            });
            return;
        } else if ((String)(password).length < 5) {
            dispatch({
                type: WARNING,
                payload: 'Password is too short. It should have at least 5 symbols'
            });
            return;
        }

        let data = new URLSearchParams();
        data.append('login', login);
        data.append('password', password);
        data.append('email', email);

        fetch(REGISTRATION_URL, {
            method: 'POST',
            body: data,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            credentials: 'include'
        })
            .then(response => {
                if (response.ok) {
                    window.sessionStorage.setItem('isAuthorised', 'true');
                    window.sessionStorage.setItem('login', login);

                    history.push(MAIN_PAGE);

                    dispatch({
                        type: REGISTRATION_COMPLETED,
                        payload: login
                    });
                } else {
                    dispatch({
                        type: REGISTRATION_FAILED
                    });
                }
            })
            .catch(error => {
                dispatch({
                    type: WARNING,
                    payload: 'There has been a problem while fetching: ' + error.message
                });
            });

    };
}
