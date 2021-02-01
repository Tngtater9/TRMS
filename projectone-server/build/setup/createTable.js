'use strict';
var __createBinding =
	(this && this.__createBinding) ||
	(Object.create
		? function (o, m, k, k2) {
				if (k2 === undefined) k2 = k;
				Object.defineProperty(o, k2, {
					enumerable: true,
					get: function () {
						return m[k];
					},
				});
		  }
		: function (o, m, k, k2) {
				if (k2 === undefined) k2 = k;
				o[k2] = m[k];
		  });
var __setModuleDefault =
	(this && this.__setModuleDefault) ||
	(Object.create
		? function (o, v) {
				Object.defineProperty(o, 'default', { enumerable: true, value: v });
		  }
		: function (o, v) {
				o['default'] = v;
		  });
var __importStar =
	(this && this.__importStar) ||
	function (mod) {
		if (mod && mod.__esModule) return mod;
		var result = {};
		if (mod != null)
			for (var k in mod)
				if (k !== 'default' && Object.prototype.hasOwnProperty.call(mod, k))
					__createBinding(result, mod, k);
		__setModuleDefault(result, mod);
		return result;
	};
Object.defineProperty(exports, '__esModule', { value: true });
var AWS = __importStar(require('aws-sdk'));
AWS.config.update({ region: 'us-west-2' });
var ddb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });
var removeUsers = {
	TableName: 'users',
};
var removeCases = {
	TableName: 'reimbursements',
};
var userSchema = {
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
var caseSchema = {
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
	setTimeout(function () {
		ddb.createTable(userSchema, function (err, data) {
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
	setTimeout(function () {
		ddb.createTable(caseSchema, function (err, data) {
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
