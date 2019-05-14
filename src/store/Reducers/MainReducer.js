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

function addLeadingZero(num) {
    return (num <= 9) ? ("0" + num) : num;
}
export default function MainReducer(state = initialState, action) {
    switch (action.type) {
        case WARNING:
            return {...state, message: action.payload};


        case UPDATE_CHART:
            return {...state, chartR: action.payload, updateChart: true};

        case UPDATE_CHART_FINISHED:
            return {...state, updateChart: false};


        case LOGOUT:
            return {...state, message: '', login: ''};

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

            return {...state, message: '', [action.group]: temp};
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

                let result = "" + time.getFullYear()
                    + "." + addLeadingZero(time.getMonth()+1)
                    + "." + addLeadingZero(time.getDate())
                    + " " + addLeadingZero(time.getHours())
                    + ":" + addLeadingZero(time.getMinutes())
                    + ":" + addLeadingZero(time.getSeconds());

                temp.push([result, e.v]);
            });

            return {...state, message: '', [action.group]: {data: temp, maxTime: maxTime}};
        }


        case CLEAN: {
            for(let value of action.payload) {
                delete state[value];
            }
            return {...state, message: ''};
        }

        default:
            return state;
    }
}