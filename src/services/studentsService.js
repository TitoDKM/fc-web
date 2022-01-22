import axios from 'axios';

export const getStudents = (page, size, search, token) => {
	return axios.get('http://localhost:8080/api/students?page=' + page + '&size=' + size + '&search=' + search, {
		headers: {
			'Authorization': 'Bearer ' + token
		}
	});
}