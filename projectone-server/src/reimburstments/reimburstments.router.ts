import express from 'express';
import logger from '../log';
import reimbursementService from './reimburstments.service';
import moment from 'moment';
import { Reimburstment } from './reimburstments';

const router = express.Router();

const TODAY = moment(new Date().toISOString());
const TWO_WKS = moment(TODAY).add(2, 'w');

router.post('/', function (req, res, next) {
	logger.debug(req.body);
	if (req.body) {
		reimbursementService.addCase(req.body).then((result) => {
			logger.debug('result', result);
			if (result) {
				res.sendStatus(201);
			} else {
				res.sendStatus(400);
			}
		});
	}
});

router.put('/', function (req, res, next) {
	logger.debug(req.body);
	if (req.body) {
		reimbursementService.updateCase(req.body).then((result) => {
			if (result) {
				res.sendStatus(204);
			} else {
				res.sendStatus(401);
			}
		});
	}
});

router.get('/', async (req, res, next) => {
	const toUpdate: Reimburstment[] = [];
	await reimbursementService.getAllCases().then((result) => {
		if (result) {
			result.forEach((c: Reimburstment) => {
				if (
					moment(c.event_date).isBetween(TODAY, TWO_WKS) &&
					(c.status !== 'Pending' || 'Awarded')
				) {
					c.isUrgent = true;
					if (c.super_approval === '') {
						c.super_approval = `AUTO APPROVED ${new Date().toISOString()}`;
					}
					if (c.head_approval === '') {
						c.head_approval = `AUTO APPROVED ${new Date().toISOString()}`;
					}
					c.status = 'In BenCo Review';
					toUpdate.push(c);
				} else if (
					moment(TODAY).isAfter(c.event_date) &&
					c.status.includes('Review')
				) {
					c.status = 'Rejected';
					toUpdate.push(c);
				}
			});
		}
	});
	logger.debug('To Update', toUpdate);
	if (toUpdate.length > 0) {
		toUpdate.forEach(
			async (c: Reimburstment) => await reimbursementService.updateCase(c)
		);
	}

	await reimbursementService.getAllCases().then((result) => {
		if (result) {
			res.send(JSON.stringify(result));
		} else {
			res.sendStatus(404);
		}
	});
});

router.get('/user/:id', async (req, res, next) => {
	const user = req.params.id;
	const toUpdate: Reimburstment[] = [];
	await reimbursementService.getCasesByUser(user).then((result) => {
		if (result) {
			result.forEach((c: Reimburstment) => {
				if (
					moment(c.event_date).isBetween(TODAY, TWO_WKS) &&
					(c.status !== 'Pending' || 'Awarded')
				) {
					c.isUrgent = true;
					if (c.super_approval === '') {
						c.super_approval = `AUTO APPROVED ${new Date().toISOString()}`;
					}
					if (c.head_approval === '') {
						c.head_approval = `AUTO APPROVED ${new Date().toISOString()}`;
					}
					c.status = 'In BenCo Review';
					toUpdate.push(c);
				} else if (
					moment(TODAY).isAfter(c.event_date) &&
					c.status.includes('Review')
				) {
					c.status = 'Rejected';
					toUpdate.push(c);
				}
			});
		}
	});

	logger.debug('To Update', toUpdate);
	if (toUpdate.length > 0) {
		toUpdate.forEach(
			async (c: Reimburstment) => await reimbursementService.updateCase(c)
		);
	}

	await reimbursementService.getCasesByUser(user).then((result) => {
		if (result) {
			res.send(JSON.stringify(result));
		} else {
			res.sendStatus(404);
		}
	});
});

router.get('/dept/:id', async (req, res, next) => {
	const dept = req.params.id;
	const toUpdate: Reimburstment[] = [];
	await reimbursementService.getCasesByDept(dept).then((result) => {
		if (result) {
			result.forEach((c: Reimburstment) => {
				if (
					moment(c.event_date).isBetween(TODAY, TWO_WKS) &&
					(c.status !== 'Pending' || 'Awarded')
				) {
					c.isUrgent = true;
					if (c.super_approval === '') {
						c.super_approval = `AUTO APPROVED ${new Date().toISOString()}`;
					}
					if (c.head_approval === '') {
						c.head_approval = `AUTO APPROVED ${new Date().toISOString()}`;
					}
					c.status = 'In BenCo Review';
					toUpdate.push(c);
				} else if (
					moment(TODAY).isAfter(c.event_date) &&
					c.status.includes('Review')
				) {
					c.status = 'Rejected';
					toUpdate.push(c);
				}
			});
		}
	});

	logger.debug('To Update', toUpdate);
	if (toUpdate.length > 0) {
		toUpdate.forEach(
			async (c: Reimburstment) => await reimbursementService.updateCase(c)
		);
	}

	await reimbursementService.getCasesByDept(dept).then((result) => {
		if (result) {
			res.send(JSON.stringify(result));
		} else {
			res.sendStatus(404);
		}
	});
});

router.get('/title/:id', async (req, res, next) => {
	const title = req.params.id;
	const toUpdate: Reimburstment[] = [];
	await reimbursementService.getCasesByTitle(title).then((result) => {
		if (result) {
			result.forEach((c: Reimburstment) => {
				if (
					moment(c.event_date).isBetween(TODAY, TWO_WKS) &&
					(c.status !== 'Pending' || 'Awarded')
				) {
					c.isUrgent = true;
					if (c.super_approval === '') {
						c.super_approval = `AUTO APPROVED ${new Date().toISOString()}`;
					}
					if (c.head_approval === '') {
						c.head_approval = `AUTO APPROVED ${new Date().toISOString()}`;
					}
					c.status = 'In BenCo Review';
					toUpdate.push(c);
				} else if (
					moment(TODAY).isAfter(c.event_date) &&
					c.status.includes('Review')
				) {
					c.status = 'Rejected';
					toUpdate.push(c);
				}
			});
		}
	});

	logger.debug('To Update', toUpdate);
	if (toUpdate.length > 0) {
		toUpdate.forEach(
			async (c: Reimburstment) => await reimbursementService.updateCase(c)
		);
	}

	await reimbursementService.getCasesByTitle(title).then((result) => {
		if (result) {
			res.send(JSON.stringify(result));
		} else {
			res.sendStatus(404);
		}
	});
});

router.get('/status/:id', async (req, res, next) => {
	const status = req.params.id;
	const toUpdate: Reimburstment[] = [];
	await reimbursementService.getCasesByStatus(status).then((result) => {
		if (result) {
			result.forEach((c: Reimburstment) => {
				if (
					moment(c.event_date).isBetween(TODAY, TWO_WKS) &&
					(c.status !== 'Pending' || 'Awarded')
				) {
					c.isUrgent = true;
					if (c.super_approval === '') {
						c.super_approval = `AUTO APPROVED ${new Date().toISOString()}`;
					}
					if (c.head_approval === '') {
						c.head_approval = `AUTO APPROVED ${new Date().toISOString()}`;
					}
					c.status = 'In BenCo Review';
					toUpdate.push(c);
				} else if (
					moment(TODAY).isAfter(c.event_date) &&
					c.status.includes('Review')
				) {
					c.status = 'Rejected';
					toUpdate.push(c);
				}
			});
		}
	});

	logger.debug('To Update', toUpdate);
	if (toUpdate.length > 0) {
		toUpdate.forEach(
			async (c: Reimburstment) => await reimbursementService.updateCase(c)
		);
	}

	await reimbursementService.getCasesByStatus(status).then((result) => {
		if (result) {
			res.send(JSON.stringify(result));
		} else {
			res.sendStatus(404);
		}
	});
});

router.delete('/delete/:id', (req: any, res, next) => {
	const created = req.params.id;
	const username = req.session.user.username;
	reimbursementService.deleteCase(username, created).then((result) => {
		if (result) {
			res.sendStatus(204);
		} else {
			res.sendStatus(401);
		}
	});
});

export default router;
