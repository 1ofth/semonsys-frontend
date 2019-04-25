export const INITIAL_STATE = 'INITIAL_STATE';

export const initialState = {
  type: INITIAL_STATE,
  login: '',
  message: '',
  chartR: 1,
  dots: []
};

// for login
export const WARNING = 'WARNING';
export const LOGIN_SUCCEED = 'LOGIN_SUCCEED';
export const LOGOUT = 'LOGOUT';
// for registration
export const REGISTRATION_COMPLETED = 'REGISTRATION_COMPLETED';
export const REGISTRATION_FAILED = 'REGISTRATION_FAILED';
// for chart
export const DOT_ADDED = 'DOT_ADDED';
export const UPDATE_CHART = 'UPDATE_CHART';
export const UPDATE_CHART_FINISHED = 'UPDATE_CHART_FINISHED';
// for table
export const DOTS_LOADED = 'DOTS_LOADED';


export const SERVERS_LOADED = 'SERVERS_LOADED';
export const RAM_DATA_LOADED = 'RAM_DATA_LOADED';
