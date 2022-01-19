export const LOGIN = 'LOGIN';
export const ERROR = 'ERROR';
export const SUCCESS = 'SUCCESS';
export const TOKEN = 'TOKEN';
export const RESET_ERRORS = 'RESET_ERRORS';

const loginData = localStorage.getItem("loginData") ? JSON.parse(localStorage.getItem("loginData")) : "";

export const INITIAL_STATE = {
	email: loginData !== "" ? loginData.email : "",
	passowrd: '',
	error: '',
	loading: '',
	logged: loginData !== "" ? true : false,
	token: loginData !== "" ? loginData.token : ""
}

export const AppReducer = (state, action) => {
	switch(action.type) {
		case LOGIN:
			return {
				...state,
				error: '',
				loading: true,
				logged: false
			}
		case SUCCESS:
			return {
				...state,
				error: '',
				loading: false,
				logged: true
			}
		case ERROR:
			return {
				...state,
				error: action.error,
				loading: false,
				logged: false
			}
		case RESET_ERRORS:
			return {
				...state,
				error: ''
			}
		case TOKEN:
			return {
				...state,
				token: action.token
			}
		default:
			return state;
	}
}