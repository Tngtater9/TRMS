"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var users_service_1 = __importDefault(require("./users.service"));
var user = __importStar(require("./user"));
var log_1 = __importDefault(require("../log"));
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
router.get('/', function (req, res, next) {
    var u = __assign({}, req.session.user);
    if (u.username) {
        users_service_1.default
            .getUserByName(u.username)
            .then(function (result) {
            if (result) {
                res.send(JSON.stringify(result));
            }
            else {
                res.status(404).send('User not found');
            }
        })
            .catch(function (error) {
            log_1.default.debug(error.error);
            res.status(404).send(error);
        });
    }
    else {
        res.sendStatus(401);
    }
});
router.post('/', function (req, res, next) {
    log_1.default.debug(req.body);
    if (req.body) {
        users_service_1.default
            .addUser(req.body)
            .then(function (result) {
            if (result) {
                res.sendStatus(201);
            }
            else {
                res.status(400).send('User not created');
            }
        })
            .catch(function (error) {
            log_1.default.debug(error.error);
            res.status(404).send(error);
        });
    }
});
router.put('/', function (req, res, next) {
    log_1.default.debug(req.body);
    var u = __assign({}, req.session.user);
    if (req.body && u.username) {
        users_service_1.default
            .updateUser(req.body)
            .then(function (result) {
            if (result) {
                res.sendStatus(204);
            }
        })
            .catch(function (error) {
            log_1.default.debug(error.error);
            res.status(404).send(error);
        });
    }
    else {
        res.status(401).send('User not updated');
    }
});
router.delete('/', function (req, res, next) {
    req.session.destroy(function (err) { return log_1.default.error(err); });
    res.sendStatus(204);
});
router.post('/login', function (req, res, next) {
    log_1.default.debug(req.body);
    if (req.body) {
        var _a = req.body, username = _a.username, password = _a.password;
        user
            .login(username, password)
            .then(function (user) {
            if (user) {
                req.session.user = user;
                res.send(JSON.stringify(user));
            }
            else {
                res.status(401).send('Username or password incorrect');
            }
        })
            .catch(function (error) {
            log_1.default.debug(error.error);
            res.status(404).send(error);
        });
    }
});
router.get('/:title', function (req, res, next) {
    console.log(req.params.title);
    users_service_1.default
        .getUsersByTitle(req.params.title)
        .then(function (result) {
        if (result) {
            res.send(JSON.stringify(result));
        }
        else {
            res.status(404).send('Manager not found');
        }
    })
        .catch(function (error) {
        log_1.default.debug(error.error);
        res.status(404).send(error);
    });
});
router.get('/user/:user', function (req, res, next) {
    console.log(req.params.user);
    users_service_1.default
        .getUserByName(req.params.user)
        .then(function (result) {
        if (result) {
            res.send(JSON.stringify(result));
        }
        else {
            res.status(404).send('User not found');
        }
    })
        .catch(function (error) {
        log_1.default.debug(error.error);
        res.status(404).send(error);
    });
});
exports.default = router;
