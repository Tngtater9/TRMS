'use strict';
var __importDefault =
	(this && this.__importDefault) ||
	function (mod) {
		return mod && mod.__esModule ? mod : { default: mod };
	};
Object.defineProperty(exports, '__esModule', { value: true });
var http_errors_1 = __importDefault(require('http-errors'));
var express_1 = __importDefault(require('express'));
var morgan_1 = __importDefault(require('morgan'));
var express_session_1 = __importDefault(require('express-session'));
var memorystore_1 = __importDefault(require('memorystore'));
var cors_1 = __importDefault(require('cors'));
var dotenv_1 = __importDefault(require('dotenv'));
var users_router_1 = __importDefault(require('./users/users.router'));
var constant_1 = __importDefault(require('./constant'));
var reimbursements_router_1 = __importDefault(
	require('./reimbursements/reimbursements.router')
);
dotenv_1.default.config();
var app = express_1.default();
app.use(cors_1.default({ origin: process.env.CLIENT, credentials: true }));
app.use(morgan_1.default('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.static(constant_1.default));
app.use(
	express_session_1.default({
		secret: 'supercerealsecret',
		store: new (memorystore_1.default(express_session_1.default))({
			checkPeriod: 86400000,
		}),
		cookie: {},
		resave: true,
		saveUninitialized: true,
	})
);
app.use('/users', users_router_1.default);
app.use('/cases', reimbursements_router_1.default);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(http_errors_1.default(404));
});
// error handler
app.use(function (err, req, res, next) {
	// Send error file
	res.status(err.status || 500);
});
module.exports = app;
