import {
    LOGIN_SUCCEED,
    LOGOUT,
    REGISTRATION_COMPLETED,
    REGISTRATION_FAILED,
    WARNING
} from "./States";
import history from "../History";
import {MAIN_PAGE} from "../Views";

export function makeWarning(message) {
    return {
        type: WARNING,
        payload: message
    }
}
export function loadData() {
    return (dispatch) => {
        fetch('http://185.43.5.178/server/rest/secured/data/composite/after?server_id=1&identifier=Process 5542&time=0', {
            method: 'GET',
            withCredentials: true
        })
            .then((response) => {
                return response.json()
            })
            // .then((response) => {
            //     dispatch({
            //         type: DATA_READY,
            //         payload: response
            //     });
            // })
            .catch(function (error) {
                dispatch({
                    type: WARNING,
                    payload: 'There has been a problem while fetching: ' + error.message
                });
            });
    }
}
export function login(login, password) {
    return (dispatch) => {
        let data = new URLSearchParams();
        data.append('login', login);
        data.append('password', password);

        fetch('http://185.43.5.178/server/rest/login', {
            method: 'POST',
            body: data,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            credentials: 'include'

        }).then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Network response was not ok.');
        })
            .then(response => {
                console.log(response);
                console.log(JSON.stringify(response));
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
    // Math.round((new Date()).getTime() / 1000);
    return (dispatch) => {
        fetch('http://185.43.5.178/server/rest/secured/logout', {
            method: 'POST',
            body: '',
            headers: {
                'Authorization': 'Bearer ' + window.sessionStorage.getItem('accessToken'),
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            credentials: 'include'

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

export function refreshTokens() {
    return (dispatch) => {
        let data = new URLSearchParams();
        data.append('refreshToken', window.sessionStorage.getItem('refreshToken'));

        fetch('http://185.43.5.178/server/rest/secured/refresh-tokens', {
            method: 'POST',
            body: data,
            headers: {
                'Authorization': 'Bearer ' + window.sessionStorage.getItem('accessToken'),
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            credentials: 'include'

        }).then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Network response was not ok.');
        }).then(response => {
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

export function register(login, password, email) {
    return (dispatch) => {
        if ((String)(login).length < 5) {
            dispatch({
                type: WARNING,
                payload: 'Login is too short. It should have at least 5 symbols'
            });
            return;
        } else if ((String)(password).length < 4) {
            dispatch({
                type: WARNING,
                payload: 'Password is too short. It should have at least 4 symbols'
            });
            return;
        }

        let data = new URLSearchParams();
        data.append('login', login);
        data.append('password', password);
        data.append('email', email);

        fetch('http://185.43.5.178/server/rest/registration', {
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
