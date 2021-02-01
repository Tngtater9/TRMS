import createError from 'http-errors';
import express from 'express';
import logger from 'morgan';
import session from 'express-session';
import MemoryStore from 'memorystore';
import cors from 'cors';
import dotenv from 'dotenv';
import usersRouter from './users/users.router';
import publicDir from './constant';
import casesRouter from './reimbursements/reimbursements.router';

dotenv.config();

var app = express();

app.use(cors({ origin: process.env.CLIENT, credentials: true }));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(publicDir));
app.use(
	session({
		secret: 'supercerealsecret',
		store: new (MemoryStore(session))({ checkPeriod: 86400000 }),
		cookie: {},
		resave: true,
		saveUninitialized: true,
	})
);

app.use('/users', usersRouter);
app.use('/cases', casesRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err: any, req: any, res: any, next: Function) {
	// Send error file
	res.status(err.status || 500);
});

module.exports = app;
