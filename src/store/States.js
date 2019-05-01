export const INITIAL_STATE = 'INITIAL_STATE';

export const initialState = {
  type: INITIAL_STATE,
  login: '',
  message: ''
};

// for login
export const WARNING = 'WARNING';
export const LOGIN_SUCCEED = 'LOGIN_SUCCEED';
export const LOGOUT = 'LOGOUT';
// for registration
export const REGISTRATION_COMPLETED = 'REGISTRATION_COMPLETED';
export const REGISTRATION_FAILED = 'REGISTRATION_FAILED';
// for chart
export const UPDATE_CHART = 'UPDATE_CHART';
export const UPDATE_CHART_FINISHED = 'UPDATE_CHART_FINISHED';

export const SINGLE_DATA_LOADED = 'SINGLE_DATA_LOADED';
export const COMPOSITE_DATA_LOADED = 'COMPOSITE_DATA_LOADED';
export const CHART_DATA_LOADED = 'CHART_DATA_LOADED';

export const CLEAN = 'CLEAN';
