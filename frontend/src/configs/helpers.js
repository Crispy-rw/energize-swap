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


export const formatTime = (data) => {
	const date = new Date(data);
	const options = { year: '2-digit', month: 'numeric', day: 'numeric',  hour: 'numeric', minute: 'numeric', hour12: true };
	const formatter = new Intl.DateTimeFormat('en-US', options);
	return formatter.format(date);
}
