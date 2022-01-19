import axios from 'axios';

export const login = (mail, password) => {
	return axios.post('http://localhost:8080/api/login', {
		mail,
		password
	});
}