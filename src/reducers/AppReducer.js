export const LOGIN = 'LOGIN';
export const ERROR = 'ERROR';
export const SUCCESS = 'SUCCESS';
export const TOKEN = 'TOKEN';
export const RESET_ERRORS = 'RESET_ERRORS';
export const LOGOUT = 'LOGOUT';
export const LOAD_STUDENTS = 'LOAD_STUDENTS';
export const LOAD_STUDENTS_SUCCESS = 'LOAD_STUDENTS_SUCCESS';
export const LOAD_STUDENTS_ERROR = 'LOAD_STUDENTS_ERROR';

const loginData = localStorage.getItem("loginData") ? JSON.parse(localStorage.getItem("loginData")) : "";

export const INITIAL_STATE = {
	email: loginData !== "" ? loginData.email : "",
	passowrd: '',
	error: '',
	loging: false,
	logged: loginData !== "" ? true : false,
	token: loginData !== "" ? loginData.token : "",
	loadingStudents: false
}

export const AppReducer = (state, action) => {
	switch(action.type) {
		case LOGIN:
			return {
				...state,
				error: '',
				loging: true,
				logged: false
			}
		case SUCCESS:
			return {
				...state,
				error: '',
				loging: false,
				logged: true
			}
		case ERROR:
			return {
				...state,
				error: action.error,
				loging: false,
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
		case LOAD_STUDENTS:
			return {
				...state,
				loadingStudents: true,
				error: ''
			}
		case LOAD_STUDENTS_SUCCESS:
			return {
				...state,
				loadingStudents: false,
				error: false
			}
		case LOAD_STUDENTS_ERROR:
			return {
				...state,
				loadingStudents: false,
				error: action.error
			}
		case LOGOUT:
			localStorage.removeItem("loginData");
			return {
				...state,
				logged: false,
				email: '',
				token: ''
			}
		default:
			return state;
	}
}