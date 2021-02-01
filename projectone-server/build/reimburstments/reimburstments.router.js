'use strict';
var __awaiter =
	(this && this.__awaiter) ||
	function (thisArg, _arguments, P, generator) {
		function adopt(value) {
			return value instanceof P
				? value
				: new P(function (resolve) {
						resolve(value);
				  });
		}
		return new (P || (P = Promise))(function (resolve, reject) {
			function fulfilled(value) {
				try {
					step(generator.next(value));
				} catch (e) {
					reject(e);
				}
			}
			function rejected(value) {
				try {
					step(generator['throw'](value));
				} catch (e) {
					reject(e);
				}
			}
			function step(result) {
				result.done
					? resolve(result.value)
					: adopt(result.value).then(fulfilled, rejected);
			}
			step((generator = generator.apply(thisArg, _arguments || [])).next());
		});
	};
var __generator =
	(this && this.__generator) ||
	function (thisArg, body) {
		var _ = {
				label: 0,
				sent: function () {
					if (t[0] & 1) throw t[1];
					return t[1];
				},
				trys: [],
				ops: [],
			},
			f,
			y,
			t,
			g;
		return (
			(g = { next: verb(0), throw: verb(1), return: verb(2) }),
			typeof Symbol === 'function' &&
				(g[Symbol.iterator] = function () {
					return this;
				}),
			g
		);
		function verb(n) {
			return function (v) {
				return step([n, v]);
			};
		}
		function step(op) {
			if (f) throw new TypeError('Generator is already executing.');
			while (_)
				try {
					if (
						((f = 1),
						y &&
							(t =
								op[0] & 2
									? y['return']
									: op[0]
									? y['throw'] || ((t = y['return']) && t.call(y), 0)
									: y.next) &&
							!(t = t.call(y, op[1])).done)
					)
						return t;
					if (((y = 0), t)) op = [op[0] & 2, t.value];
					switch (op[0]) {
						case 0:
						case 1:
							t = op;
							break;
						case 4:
							_.label++;
							return { value: op[1], done: false };
						case 5:
							_.label++;
							y = op[1];
							op = [0];
							continue;
						case 7:
							op = _.ops.pop();
							_.trys.pop();
							continue;
						default:
							if (
								!((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
								(op[0] === 6 || op[0] === 2)
							) {
								_ = 0;
								continue;
							}
							if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
								_.label = op[1];
								break;
							}
							if (op[0] === 6 && _.label < t[1]) {
								_.label = t[1];
								t = op;
								break;
							}
							if (t && _.label < t[2]) {
								_.label = t[2];
								_.ops.push(op);
								break;
							}
							if (t[2]) _.ops.pop();
							_.trys.pop();
							continue;
					}
					op = body.call(thisArg, _);
				} catch (e) {
					op = [6, e];
					y = 0;
				} finally {
					f = t = 0;
				}
			if (op[0] & 5) throw op[1];
			return { value: op[0] ? op[1] : void 0, done: true };
		}
	};
var __importDefault =
	(this && this.__importDefault) ||
	function (mod) {
		return mod && mod.__esModule ? mod : { default: mod };
	};
Object.defineProperty(exports, '__esModule', { value: true });
var express_1 = __importDefault(require('express'));
var log_1 = __importDefault(require('../log'));
var reimbursements_service_1 = __importDefault(
	require('./reimbursements.service')
);
var moment_1 = __importDefault(require('moment'));
var router = express_1.default.Router();
var TODAY = moment_1.default(new Date().toISOString());
var TWO_WKS = moment_1.default(TODAY).add(2, 'w');
router.post('/', function (req, res, next) {
	log_1.default.debug(req.body);
	if (req.body) {
		reimbursements_service_1.default.addCase(req.body).then(function (result) {
			log_1.default.debug('result', result);
			if (result) {
				res.sendStatus(201);
			} else {
				res.sendStatus(400);
			}
		});
	}
});
router.put('/', function (req, res, next) {
	log_1.default.debug(req.body);
	if (req.body) {
		reimbursements_service_1.default
			.updateCase(req.body)
			.then(function (result) {
				if (result) {
					res.sendStatus(204);
				} else {
					res.sendStatus(401);
				}
			});
	}
});
router.get('/', function (req, res, next) {
	return __awaiter(void 0, void 0, void 0, function () {
		var toUpdate;
		return __generator(this, function (_a) {
			switch (_a.label) {
				case 0:
					toUpdate = [];
					return [
						4 /*yield*/,
						reimbursements_service_1.default
							.getAllCases()
							.then(function (result) {
								if (result) {
									result.forEach(function (c) {
										if (
											moment_1
												.default(c.event_date)
												.isBetween(TODAY, TWO_WKS) &&
											(c.status !== 'Pending' || 'Awarded')
										) {
											c.isUrgent = true;
											if (c.super_approval === '') {
												c.super_approval =
													'AUTO APPROVED ' + new Date().toISOString();
											}
											if (c.head_approval === '') {
												c.head_approval =
													'AUTO APPROVED ' + new Date().toISOString();
											}
											c.status = 'In BenCo Review';
											toUpdate.push(c);
										} else if (
											moment_1.default(TODAY).isAfter(c.event_date) &&
											c.status.includes('Review')
										) {
											c.status = 'Rejected';
											toUpdate.push(c);
										}
									});
								}
							}),
					];
				case 1:
					_a.sent();
					log_1.default.debug('To Update', toUpdate);
					if (toUpdate.length > 0) {
						toUpdate.forEach(function (c) {
							return __awaiter(void 0, void 0, void 0, function () {
								return __generator(this, function (_a) {
									switch (_a.label) {
										case 0:
											return [
												4 /*yield*/,
												reimbursements_service_1.default.updateCase(c),
											];
										case 1:
											return [2 /*return*/, _a.sent()];
									}
								});
							});
						});
					}
					return [
						4 /*yield*/,
						reimbursements_service_1.default
							.getAllCases()
							.then(function (result) {
								if (result) {
									res.send(JSON.stringify(result));
								} else {
									res.sendStatus(404);
								}
							}),
					];
				case 2:
					_a.sent();
					return [2 /*return*/];
			}
		});
	});
});
router.get('/user/:id', function (req, res, next) {
	return __awaiter(void 0, void 0, void 0, function () {
		var user, toUpdate;
		return __generator(this, function (_a) {
			switch (_a.label) {
				case 0:
					user = req.params.id;
					toUpdate = [];
					return [
						4 /*yield*/,
						reimbursements_service_1.default
							.getCasesByUser(user)
							.then(function (result) {
								if (result) {
									result.forEach(function (c) {
										if (
											moment_1
												.default(c.event_date)
												.isBetween(TODAY, TWO_WKS) &&
											(c.status !== 'Pending' || 'Awarded')
										) {
											c.isUrgent = true;
											if (c.super_approval === '') {
												c.super_approval =
													'AUTO APPROVED ' + new Date().toISOString();
											}
											if (c.head_approval === '') {
												c.head_approval =
													'AUTO APPROVED ' + new Date().toISOString();
											}
											c.status = 'In BenCo Review';
											toUpdate.push(c);
										} else if (
											moment_1.default(TODAY).isAfter(c.event_date) &&
											c.status.includes('Review')
										) {
											c.status = 'Rejected';
											toUpdate.push(c);
										}
									});
								}
							}),
					];
				case 1:
					_a.sent();
					log_1.default.debug('To Update', toUpdate);
					if (toUpdate.length > 0) {
						toUpdate.forEach(function (c) {
							return __awaiter(void 0, void 0, void 0, function () {
								return __generator(this, function (_a) {
									switch (_a.label) {
										case 0:
											return [
												4 /*yield*/,
												reimbursements_service_1.default.updateCase(c),
											];
										case 1:
											return [2 /*return*/, _a.sent()];
									}
								});
							});
						});
					}
					return [
						4 /*yield*/,
						reimbursements_service_1.default
							.getCasesByUser(user)
							.then(function (result) {
								if (result) {
									res.send(JSON.stringify(result));
								} else {
									res.sendStatus(404);
								}
							}),
					];
				case 2:
					_a.sent();
					return [2 /*return*/];
			}
		});
	});
});
router.get('/dept/:id', function (req, res, next) {
	return __awaiter(void 0, void 0, void 0, function () {
		var dept, toUpdate;
		return __generator(this, function (_a) {
			switch (_a.label) {
				case 0:
					dept = req.params.id;
					toUpdate = [];
					return [
						4 /*yield*/,
						reimbursements_service_1.default
							.getCasesByDept(dept)
							.then(function (result) {
								if (result) {
									result.forEach(function (c) {
										if (
											moment_1
												.default(c.event_date)
												.isBetween(TODAY, TWO_WKS) &&
											(c.status !== 'Pending' || 'Awarded')
										) {
											c.isUrgent = true;
											if (c.super_approval === '') {
												c.super_approval =
													'AUTO APPROVED ' + new Date().toISOString();
											}
											if (c.head_approval === '') {
												c.head_approval =
													'AUTO APPROVED ' + new Date().toISOString();
											}
											c.status = 'In BenCo Review';
											toUpdate.push(c);
										} else if (
											moment_1.default(TODAY).isAfter(c.event_date) &&
											c.status.includes('Review')
										) {
											c.status = 'Rejected';
											toUpdate.push(c);
										}
									});
								}
							}),
					];
				case 1:
					_a.sent();
					log_1.default.debug('To Update', toUpdate);
					if (toUpdate.length > 0) {
						toUpdate.forEach(function (c) {
							return __awaiter(void 0, void 0, void 0, function () {
								return __generator(this, function (_a) {
									switch (_a.label) {
										case 0:
											return [
												4 /*yield*/,
												reimbursements_service_1.default.updateCase(c),
											];
										case 1:
											return [2 /*return*/, _a.sent()];
									}
								});
							});
						});
					}
					return [
						4 /*yield*/,
						reimbursements_service_1.default
							.getCasesByDept(dept)
							.then(function (result) {
								if (result) {
									res.send(JSON.stringify(result));
								} else {
									res.sendStatus(404);
								}
							}),
					];
				case 2:
					_a.sent();
					return [2 /*return*/];
			}
		});
	});
});
router.get('/title/:id', function (req, res, next) {
	return __awaiter(void 0, void 0, void 0, function () {
		var title, toUpdate;
		return __generator(this, function (_a) {
			switch (_a.label) {
				case 0:
					title = req.params.id;
					toUpdate = [];
					return [
						4 /*yield*/,
						reimbursements_service_1.default
							.getCasesByTitle(title)
							.then(function (result) {
								if (result) {
									result.forEach(function (c) {
										if (
											moment_1
												.default(c.event_date)
												.isBetween(TODAY, TWO_WKS) &&
											(c.status !== 'Pending' || 'Awarded')
										) {
											c.isUrgent = true;
											if (c.super_approval === '') {
												c.super_approval =
													'AUTO APPROVED ' + new Date().toISOString();
											}
											if (c.head_approval === '') {
												c.head_approval =
													'AUTO APPROVED ' + new Date().toISOString();
											}
											c.status = 'In BenCo Review';
											toUpdate.push(c);
										} else if (
											moment_1.default(TODAY).isAfter(c.event_date) &&
											c.status.includes('Review')
										) {
											c.status = 'Rejected';
											toUpdate.push(c);
										}
									});
								}
							}),
					];
				case 1:
					_a.sent();
					log_1.default.debug('To Update', toUpdate);
					if (toUpdate.length > 0) {
						toUpdate.forEach(function (c) {
							return __awaiter(void 0, void 0, void 0, function () {
								return __generator(this, function (_a) {
									switch (_a.label) {
										case 0:
											return [
												4 /*yield*/,
												reimbursements_service_1.default.updateCase(c),
											];
										case 1:
											return [2 /*return*/, _a.sent()];
									}
								});
							});
						});
					}
					return [
						4 /*yield*/,
						reimbursements_service_1.default
							.getCasesByTitle(title)
							.then(function (result) {
								if (result) {
									res.send(JSON.stringify(result));
								} else {
									res.sendStatus(404);
								}
							}),
					];
				case 2:
					_a.sent();
					return [2 /*return*/];
			}
		});
	});
});
router.get('/status/:id', function (req, res, next) {
	return __awaiter(void 0, void 0, void 0, function () {
		var status, toUpdate;
		return __generator(this, function (_a) {
			switch (_a.label) {
				case 0:
					status = req.params.id;
					toUpdate = [];
					return [
						4 /*yield*/,
						reimbursements_service_1.default
							.getCasesByStatus(status)
							.then(function (result) {
								if (result) {
									result.forEach(function (c) {
										if (
											moment_1
												.default(c.event_date)
												.isBetween(TODAY, TWO_WKS) &&
											(c.status !== 'Pending' || 'Awarded')
										) {
											c.isUrgent = true;
											if (c.super_approval === '') {
												c.super_approval =
													'AUTO APPROVED ' + new Date().toISOString();
											}
											if (c.head_approval === '') {
												c.head_approval =
													'AUTO APPROVED ' + new Date().toISOString();
											}
											c.status = 'In BenCo Review';
											toUpdate.push(c);
										} else if (
											moment_1.default(TODAY).isAfter(c.event_date) &&
											c.status.includes('Review')
										) {
											c.status = 'Rejected';
											toUpdate.push(c);
										}
									});
								}
							}),
					];
				case 1:
					_a.sent();
					log_1.default.debug('To Update', toUpdate);
					if (toUpdate.length > 0) {
						toUpdate.forEach(function (c) {
							return __awaiter(void 0, void 0, void 0, function () {
								return __generator(this, function (_a) {
									switch (_a.label) {
										case 0:
											return [
												4 /*yield*/,
												reimbursements_service_1.default.updateCase(c),
											];
										case 1:
											return [2 /*return*/, _a.sent()];
									}
								});
							});
						});
					}
					return [
						4 /*yield*/,
						reimbursements_service_1.default
							.getCasesByStatus(status)
							.then(function (result) {
								if (result) {
									res.send(JSON.stringify(result));
								} else {
									res.sendStatus(404);
								}
							}),
					];
				case 2:
					_a.sent();
					return [2 /*return*/];
			}
		});
	});
});
router.delete('/delete/:id', function (req, res, next) {
	var created = req.params.id;
	var username = req.session.user.username;
	reimbursements_service_1.default
		.deleteCase(username, created)
		.then(function (result) {
			if (result) {
				res.sendStatus(204);
			} else {
				res.sendStatus(401);
			}
		});
});
exports.default = router;
