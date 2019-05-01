import {
    initialState,
    LOGIN_SUCCEED,
    LOGOUT,
    REGISTRATION_COMPLETED,
    REGISTRATION_FAILED,
    UPDATE_CHART,
    UPDATE_CHART_FINISHED,
    WARNING,
    COMPOSITE_DATA_LOADED, SINGLE_DATA_LOADED, CLEAN, CHART_DATA_LOADED
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


        case SINGLE_DATA_LOADED: {
            let composite = [];
            if (state[action.group] !== undefined) {
                let temp = state[action.group];
                for (let i = 0; i < temp.length; i++) {
                    if (Array.isArray(temp[i])) {
                        composite.push(temp[i])
                    }
                }
            }

            return {...state, [action.group]: action.payload.concat(composite)};
        }

        case COMPOSITE_DATA_LOADED: {
            let temp = [];
            if (state[action.group] !== undefined) {
                temp = state[action.group];
                temp = temp.filter(function (value) {
                    return !Array.isArray(value);
                });
            }

            if (action.payload.length > 0) {
                temp = temp.concat([action.payload]);
            }

            return {...state, [action.group]: temp};
        }

        case CHART_DATA_LOADED: {
            let temp = [];
            let maxTime = 1;
            if (state[action.group] !== undefined) {
                temp = state[action.group].data;
                maxTime = state[action.group].maxTime;
            }
            action.payload.forEach((e) => {
                if (e.t > maxTime) maxTime = e.t;

                let time = new Date(e.t);

                let result = "" + (time.getDay() < 10 ? "0" + time.getDay() : time.getDay())
                    + "." + (time.getMonth() < 10 ? "0" + time.getMonth() : time.getMonth())
                    + " " + (time.getHours() < 10 ? "0" + time.getHours() : time.getHours())
                    + ":" + (time.getMinutes() < 10 ? "0" + time.getMinutes() : time.getMinutes())
                    + ":" + (time.getSeconds() < 10 ? "0" + time.getSeconds() : time.getSeconds());

                temp.push([result, e.v]);
            });

            return {...state, [action.group]: {data: temp, maxTime: maxTime}};
        }


        case CLEAN: {
            if (action.payload !== undefined) {
                for (let i = 0; i < action.payload.length; i++) {
                    delete state[action.payload[i]];
                }
            }
            return {...state};
        }

        default:
            return state;
    }
}