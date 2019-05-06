import React from 'react';
import ReactDOM from 'react-dom';
import {applyMiddleware, createStore} from 'redux';
import {Provider} from 'react-redux';
import {Route, Router, Switch} from 'react-router-dom';
import thunk from 'redux-thunk';
import {initialState} from "./store/States";
import {createLogger} from 'redux-logger'

import history from './History';

import {LOGIN_PAGE, MAIN_PAGE, path, REGISTRATION_PAGE} from "./Views";

import RegisterPage from './containers/RegisterPage';
import MainPage from './containers/MainPage';

import MainReducer from "./store/Reducers/MainReducer";

import './styles/common.css';
import AboutPage from "./containers/AboutPage";
import LoginPage from "./containers/LoginPage";

const logger = createLogger();
const store = createStore(MainReducer, initialState, applyMiddleware(thunk, logger));

const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href = "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <Switch>
                <Route exact path={path} component={AboutPage}/>
                <Route path={path + LOGIN_PAGE} component={LoginPage}/>
                <Route path={path + REGISTRATION_PAGE} component={RegisterPage}/>
                <Route path={path + MAIN_PAGE} component={MainPage}/>
                <Route component={AboutPage}/>
            </Switch>
        </Router>
    </Provider>,
    document.getElementById('root')
);