import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import dynamo from '../dynamo/dynamo';
import logger from '../log';
import { User } from './user';

class UsersService {
	private doc: DocumentClient;
	constructor() {
		this.doc = dynamo;
	}

	async getUserByName(username: string): Promise<User | null> {
		const params = {
			Key: {
				username: username,
			},
			TableName: 'users',
		};
		return await this.doc
			.get(params)
			.promise()
			.then((data) => {
				if (data && data.Item) {
					logger.debug(`data.Item ${JSON.stringify(data.Item)}`);
					return data.Item as User;
				} else {
					return null;
				}
			});
	}

	async getUsersByTitle(title: string): Promise<User[] | null> {
		const params = {
			IndexName: 'UsersByTitle',
			TableName: 'users',
			KeyConditionExpression: '#t = :title',
			ExpressionAttributeNames: {
				'#t': 'title',
			},
			ExpressionAttributeValues: {
				':title': title,
			},
		};
		return await this.doc
			.query(params)
			.promise()
			.then((data) => {
				if (data && data.Items) {
					logger.debug(`data.Items ${JSON.stringify(data.Items)}`);
					return data.Items as User[];
				} else {
					return null;
				}
			});
	}

	async addUser(user: User): Promise<boolean> {
		const params = {
			TableName: 'users',
			Item: user,
			ConditionExpression: '#name <> :name',
			ExpressionAttributeNames: {
				'#name': 'username',
			},
			ExpressionAttributeValues: {
				':name': user.username,
			},
		};
		return await this.doc
			.put(params)
			.promise()
			.then((result) => {
				logger.info('Successfully created item');
				return true;
			})
			.catch((error) => {
				logger.error(error);
				return false;
			});
	}

	async updateUser(user: User): Promise<boolean> {
		const params = {
			TableName: 'users',
			Key: {
				username: user.username,
			},
			UpdateExpression:
				'set password = :p, avail_funds = :af, pending_funds = :pf, awarded_funds = :award, dept = :d, title = :t, supervisor = :s, dept_head = :dh',
			ExpressionAttributeValues: {
				':af': user.avail_funds,
				':pf': user.pending_funds,
				':award': user.awarded_funds,
				':p': user.password,
				':d': user.dept,
				':t': user.title,
				':s': user.supervisor,
				':dh': user.dept_head,
			},
			ReturnValues: 'UPDATED_NEW',
		};
		return await this.doc
			.update(params)
			.promise()
			.then((data) => {
				logger.debug(data);
				return true;
			})
			.catch((error) => {
				logger.error(error);
				return false;
			});
	}
}
const usersService = new UsersService();
export default usersService;
