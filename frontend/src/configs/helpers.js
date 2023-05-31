import jwt_decode from "jwt-decode";

export const token = localStorage.getItem('token');

export default () => {
	try {
		const userData = jwt_decode(localStorage.getItem('token'));
		if (userData === null) throw new Error();
		return userData;
	} catch (err) {
		return null;
	}
};
