import * as AWS from 'aws-sdk';
import { User } from '../users/user';
import usersService from '../users/users.service';

AWS.config.update({ region: 'us-west-2' });

const ddb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });

const removeUsers = {
	TableName: 'users',
};

const removeCases = {
	TableName: 'reimbursements',
};

const userSchema = {
	AttributeDefinitions: [
		{
			AttributeName: 'username',
			AttributeType: 'S',
		},
		{
			AttributeName: 'title',
			AttributeType: 'S',
		},
	],
	KeySchema: [
		{
			AttributeName: 'username',
			KeyType: 'HASH',
		},
	],
	ProvisionedThroughput: {
		ReadCapacityUnits: 1,
		WriteCapacityUnits: 3,
	},
	TableName: 'users',
	StreamSpecification: {
		StreamEnabled: false,
	},
	GlobalSecondaryIndexes: [
		{
			IndexName: 'UsersByTitle',
			KeySchema: [
				{
					AttributeName: 'title',
					KeyType: 'HASH',
				},
			],
			Projection: {
				ProjectionType: 'ALL',
			},
			ProvisionedThroughput: {
				ReadCapacityUnits: 1,
				WriteCapacityUnits: 1,
			},
		},
	],
};

const caseSchema = {
	AttributeDefinitions: [
		{
			AttributeName: 'created',
			AttributeType: 'S',
		},
		{
			AttributeName: 'username',
			AttributeType: 'S',
		},
		{
			AttributeName: 'title',
			AttributeType: 'S',
		},
		{
			AttributeName: 'status',
			AttributeType: 'S',
		},
		{
			AttributeName: 'dept',
			AttributeType: 'S',
		},
	],
	KeySchema: [
		{
			AttributeName: 'created',
			KeyType: 'HASH',
		},
	],
	ProvisionedThroughput: {
		ReadCapacityUnits: 3,
		WriteCapacityUnits: 3,
	},
	TableName: 'reimbursements',
	StreamSpecification: {
		StreamEnabled: false,
	},
	GlobalSecondaryIndexes: [
		{
			IndexName: 'CasesByUser',
			KeySchema: [
				{
					AttributeName: 'username',
					KeyType: 'HASH',
				},
			],
			Projection: {
				ProjectionType: 'ALL',
			},
			ProvisionedThroughput: {
				ReadCapacityUnits: 1,
				WriteCapacityUnits: 1,
			},
		},
		{
			IndexName: 'CasesByTitle',
			KeySchema: [
				{
					AttributeName: 'title',
					KeyType: 'HASH',
				},
			],
			Projection: {
				ProjectionType: 'ALL',
			},
			ProvisionedThroughput: {
				ReadCapacityUnits: 1,
				WriteCapacityUnits: 1,
			},
		},
		{
			IndexName: 'CasesByStatus',
			KeySchema: [
				{
					AttributeName: 'status',
					KeyType: 'HASH',
				},
			],
			Projection: {
				ProjectionType: 'ALL',
			},
			ProvisionedThroughput: {
				ReadCapacityUnits: 1,
				WriteCapacityUnits: 1,
			},
		},
		{
			IndexName: 'CasesByDept',
			KeySchema: [
				{
					AttributeName: 'dept',
					KeyType: 'HASH',
				},
			],
			Projection: {
				ProjectionType: 'ALL',
			},
			ProvisionedThroughput: {
				ReadCapacityUnits: 1,
				WriteCapacityUnits: 1,
			},
		},
	],
};

ddb.deleteTable(removeUsers, function (err, data) {
	if (err) {
		console.error(
			'Unable to delete table. Error JSON:',
			JSON.stringify(err, null, 2)
		);
	} else {
		console.log(
			'Deleted table. Table description JSON:',
			JSON.stringify(data, null, 2)
		);
	}
	setTimeout(() => {
		ddb.createTable(userSchema, (err, data) => {
			if (err) {
				// log the error
				console.log('Error', err);
			} else {
				// celebrate, I guess
				console.log('Table Created', data);
			}
		});
	}, 5000);
});

ddb.deleteTable(removeCases, function (err, data) {
	if (err) {
		console.error(
			'Unable to delete table. Error JSON:',
			JSON.stringify(err, null, 2)
		);
	} else {
		console.log(
			'Deleted table. Table description JSON:',
			JSON.stringify(data, null, 2)
		);
	}
	setTimeout(() => {
		ddb.createTable(caseSchema, (err, data) => {
			if (err) {
				// log the error
				console.log('Error', err);
			} else {
				// celebrate, I guess
				console.log('Table Created', data);
			}
		});
	}, 5000);
});
