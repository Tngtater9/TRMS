import usersService from './users.service';
import logger from '../log';

export class User {
	constructor(
		public username: string,
		public password: string,
		public fname: string,
		public lname: string,
		public dept: string,
		public title: string,
		public supervisor: string,
		public dept_head: string,
		public avail_funds: number,
		public pending_funds: number,
		public awarded_funds: number
	) {}
}

export async function login(
	name: string,
	password: string
): Promise<User | null> {
	logger.debug(`${name + ' ' + password}`);
	return await usersService.getUserByName(name).then((user) => {
		if (user && user.password === password) {
			return user;
		} else {
			return null;
		}
	});
}

export function updateUser(user: User) {
	usersService
		.updateUser(user)
		.then((success) => {
			logger.info('user updated successfully');
		})
		.catch((error) => {
			logger.warn('user not updated');
		});
}
