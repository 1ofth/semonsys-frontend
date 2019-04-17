import {
  DOT_ADDED,
  DOTS_LOADED,
  initialState,
  LOGIN_SUCCEED,
  LOGOUT,
  REGISTRATION_COMPLETED,
  REGISTRATION_FAILED,
  UPDATE_CHART,
  UPDATE_CHART_FINISHED,
  WARNING
} from "../States";

export default function MainReducer(state = initialState, action) {
  switch (action.type) {
    case WARNING:
      return {...state, message: action.payload};


    case UPDATE_CHART:
      return {...state, chartR: action.payload, updateChart: true};

    case UPDATE_CHART_FINISHED:
      return {...state, updateChart: false};


    case LOGOUT:
      return {...state, message: '', login: '', dots: []};

    case LOGIN_SUCCEED:
      return {...state, message: '', login: action.payload};

    case REGISTRATION_FAILED:
      return {...state, message: 'User with this name already exists'};

    case REGISTRATION_COMPLETED:
      return {...state, message: '', login: action.payload};


    case DOT_ADDED: {
      let temp = [];
      if (state.dots !== undefined) {
        temp = state.dots;
      }

      temp.push(action.payload);

      return {...state, message: '', updateChart: true, dots: temp};
    }

    case DOTS_LOADED: {
      let temp = [];
      if (state.dots !== undefined) {
        temp = state.dots;
      }

      temp = temp.concat(action.payload);

      return {...state, message: '', dots: temp};
    }


    default:
      return state;
  }
}