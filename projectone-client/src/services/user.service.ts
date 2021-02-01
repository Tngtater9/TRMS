import axios from 'axios';
import { User, LoginCreds } from '../types/user';

class UserService {
	private URI: string;
	constructor() {
		this.URI = process.env.REACT_APP_SERVER_URI + 'users';
	}

	login(loginCreds: LoginCreds): Promise<User> {
		return axios
			.post(this.URI + '/login', loginCreds, { withCredentials: true })
			.then((result) => {
				return result.data;
			});
	}

	refresh(): Promise<User> {
		// withCredentials sends our cookies with the request.
		return axios.get(this.URI, { withCredentials: true }).then((result) => {
			console.log(result);
			return result.data;
		});
	}

	addUser(user: User): Promise<null> {
		return axios.post(this.URI, user).then((result) => null);
	}

	updateUser(user: User): Promise<null> {
		return axios
			.put(this.URI, user, { withCredentials: true })
			.then((result) => null);
	}

	getSuper(title: string): Promise<User[]> {
		return axios.get(this.URI + '/' + title).then((result) => {
			return result.data;
		});
	}

	getUser(user: string): Promise<User> {
		return axios.get(this.URI + '/user/' + user).then((result) => {
			return result.data;
		});
	}

	logout(): Promise<null> {
		return axios
			.delete(this.URI, { withCredentials: true })
			.then((result) => null);
	}
}

export default new UserService();
