import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import dynamo from '../dynamo/dynamo';
import logger from '../log';
import { Reimburstment } from './reimburstments';

class ReimburstmentService {
	private doc: DocumentClient;
	constructor() {
		this.doc = dynamo;
	}

	async getAllCases(): Promise<Reimburstment[] | null> {
		return await this.doc
			.scan({ TableName: 'reimbursements' })
			.promise()
			.then((data) => {
				if (data && data.Items) {
					logger.debug(`data.Items ${JSON.stringify(data.Items)}`);
					return data.Items as Reimburstment[];
				} else {
					return null;
				}
			});
	}

	async getCasesByUser(username: string): Promise<Reimburstment[] | null> {
		const params = {
			IndexName: 'CasesByUser',
			TableName: 'reimbursements',
			Key: {
				username: username,
			},
			KeyConditionExpression: '#u = :user',
			ExpressionAttributeNames: {
				'#u': 'username',
			},
			ExpressionAttributeValues: {
				':user': username,
			},
		};

		return await this.doc
			.query(params)
			.promise()
			.then((data) => {
				if (data && data.Items) {
					logger.debug(`data.Items ${JSON.stringify(data.Items)}`);
					return data.Items as Reimburstment[];
				} else {
					return null;
				}
			});
	}

	async getCasesByTitle(title: string): Promise<Reimburstment[] | null> {
		const params = {
			IndexName: 'CasesByTitle',
			TableName: 'reimbursements',
			Key: {
				title: title,
			},
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
					return data.Items as Reimburstment[];
				} else {
					return null;
				}
			});
	}

	async getCasesByDept(dept: string): Promise<Reimburstment[] | null> {
		const params = {
			IndexName: 'CasesByDept',
			TableName: 'reimbursements',
			Key: {
				dept: dept,
			},
			KeyConditionExpression: '#d = :dept',
			ExpressionAttributeNames: {
				'#d': 'dept',
			},
			ExpressionAttributeValues: {
				':dept': dept,
			},
		};

		return await this.doc
			.query(params)
			.promise()
			.then((data) => {
				if (data && data.Items) {
					logger.debug(`data.Items ${JSON.stringify(data.Items)}`);
					return data.Items as Reimburstment[];
				} else {
					return null;
				}
			});
	}

	async getCasesByStatus(status: string): Promise<Reimburstment[] | null> {
		const params = {
			IndexName: 'CasesByStatus',
			TableName: 'reimbursements',
			Key: {
				status: status,
			},
			KeyConditionExpression: '#s = :status',
			ExpressionAttributeNames: {
				'#s': 'status',
			},
			ExpressionAttributeValues: {
				':status': status,
			},
		};

		return await this.doc
			.query(params)
			.promise()
			.then((data) => {
				if (data && data.Items) {
					logger.debug(`data.Items ${JSON.stringify(data.Items)}`);
					return data.Items as Reimburstment[];
				} else {
					return null;
				}
			});
	}

	async addCase(reimbursement: Reimburstment): Promise<boolean> {
		const params = {
			TableName: 'reimbursements',
			Item: reimbursement,
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

	async updateCase(reimbursement: Reimburstment): Promise<boolean> {
		const params = {
			TableName: 'reimbursements',
			Key: {
				created: reimbursement.created,
			},
			UpdateExpression:
				'set grade_format = :grade, #s = :stat, isUrgent = :u, isExceeding = :x, super_approval = :sa, head_approval = :ha, benco_approval = :ba, additional_info = :add, approved_amount = :app, reasonToExceed = :rte, reasonToDeny = :rtd, info_request = :req',
			ExpressionAttributeNames: {
				'#s': 'status',
			},
			ExpressionAttributeValues: {
				':grade': reimbursement.grade_format,
				':stat': reimbursement.status,
				':u': reimbursement.isUrgent,
				':x': reimbursement.isExceeding,
				':sa': reimbursement.super_approval,
				':ha': reimbursement.head_approval,
				':ba': reimbursement.benco_approval,
				':add': reimbursement.additional_info,
				':app': reimbursement.approved_amount,
				':rte': reimbursement.reasonToExceed,
				':rtd': reimbursement.reasonToDeny,
				':req': reimbursement.info_request,
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

	async deleteCase(user: string, created: string): Promise<boolean> {
		const params = {
			TableName: 'reimbursements',
			Key: {
				created: created,
			},
			ConditionExpression: 'created = :c',
			ExpressionAttributeValues: {
				':c': created,
			},
		};
		return await this.doc
			.delete(params)
			.promise()
			.then((data) => {
				logger.info('Case deleted', data);
				return true;
			})
			.catch((error) => {
				logger.error(error);
				return false;
			});
	}
}

const reimbursementService = new ReimburstmentService();
export default reimbursementService;
