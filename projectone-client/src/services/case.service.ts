import axios from 'axios';
import { Reimburstment } from '../types/reimburstments';

class CaseService {
	private URI: string;
	constructor() {
		this.URI = process.env.REACT_APP_SERVER_URI + 'cases';
	}

	getAllCases(): Promise<Reimburstment[]> {
		return axios.get(this.URI, { withCredentials: true }).then((result) => {
			console.log(result);
			return result.data;
		});
	}

	getCasesByUser(username: string): Promise<Reimburstment[]> {
		return axios
			.get(this.URI + '/user/' + username, { withCredentials: true })
			.then((result) => {
				console.log(result);
				return result.data;
			});
	}

	getCasesByDept(dept: string): Promise<Reimburstment[]> {
		return axios
			.get(this.URI + '/dept/' + dept, { withCredentials: true })
			.then((result) => {
				console.log(result);
				return result.data;
			});
	}

	getCasesByTitle(title: string): Promise<Reimburstment[]> {
		return axios
			.get(this.URI + '/title/' + title, { withCredentials: true })
			.then((result) => {
				console.log(result);
				return result.data;
			});
	}

	getCasesByStatus(status: string): Promise<Reimburstment[]> {
		return axios
			.get(this.URI + '/status/' + status, { withCredentials: true })
			.then((result) => {
				console.log(result);
				return result.data;
			});
	}

	addCase(newCase: Reimburstment): Promise<null> {
		return axios
			.post(this.URI, newCase, { withCredentials: true })
			.then((result) => null);
	}

	updateCase(updatedCase: Reimburstment): Promise<null> {
		return axios
			.put(this.URI, updatedCase, { withCredentials: true })
			.then((result) => null);
	}

	deleteCase(created: string): Promise<null> {
		return axios
			.delete(this.URI + `/delete/${created}`, {
				withCredentials: true,
			})
			.then((result) => null);
	}
}

export default new CaseService();
