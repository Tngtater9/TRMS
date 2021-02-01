import usersService from './users.service';
import * as user from './user';
import logger from '../log';
import express from 'express';
const router = express.Router();

router.get('/', (req: any, res, next) => {
	let u = { ...req.session.user };

	if (u.username) {
		usersService
			.getUserByName(u.username)
			.then((result) => {
				if (result) {
					res.send(JSON.stringify(result));
				} else {
					res.status(404).send('User not found');
				}
			})
			.catch((error) => {
				logger.debug(error.error);
				res.status(404).send(error);
			});
	} else {
		res.sendStatus(401);
	}
});

router.post('/', function (req, res, next) {
	logger.debug(req.body);
	if (req.body) {
		usersService
			.addUser(req.body)
			.then((result) => {
				if (result) {
					res.sendStatus(201);
				} else {
					res.status(400).send('User not created');
				}
			})
			.catch((error) => {
				logger.debug(error.error);
				res.status(404).send(error);
			});
	}
});

router.put('/', function (req: any, res, next) {
	logger.debug(req.body);
	let u = { ...req.session.user };

	if (req.body && u.username) {
		usersService
			.updateUser(req.body)
			.then((result) => {
				if (result) {
					res.sendStatus(204);
				}
			})
			.catch((error) => {
				logger.debug(error.error);
				res.status(404).send(error);
			});
	} else {
		res.status(401).send('User not updated');
	}
});

router.delete('/', (req, res, next) => {
	req.session.destroy((err) => logger.error(err));
	res.sendStatus(204);
});

router.post('/login', function (req: any, res, next) {
	logger.debug(req.body);
	if (req.body) {
		let { username, password } = req.body;
		user
			.login(username, password)
			.then((user) => {
				if (user) {
					req.session.user = user;
					res.send(JSON.stringify(user));
				} else {
					res.status(401).send('Username or password incorrect');
				}
			})
			.catch((error) => {
				logger.debug(error.error);
				res.status(404).send(error);
			});
	}
});

router.get('/:title', (req: any, res, next) => {
	console.log(req.params.title);
	usersService
		.getUsersByTitle(req.params.title)
		.then((result) => {
			if (result) {
				res.send(JSON.stringify(result));
			} else {
				res.status(404).send('Manager not found');
			}
		})
		.catch((error) => {
			logger.debug(error.error);
			res.status(404).send(error);
		});
});

router.get('/user/:user', (req: any, res, next) => {
	console.log(req.params.user);
	usersService
		.getUserByName(req.params.user)
		.then((result) => {
			if (result) {
				res.send(JSON.stringify(result));
			} else {
				res.status(404).send('User not found');
			}
		})
		.catch((error) => {
			logger.debug(error.error);
			res.status(404).send(error);
		});
});

export default router;
