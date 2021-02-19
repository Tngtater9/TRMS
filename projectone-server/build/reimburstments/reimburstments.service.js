"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dynamo_1 = __importDefault(require("../dynamo/dynamo"));
var log_1 = __importDefault(require("../log"));
var ReimburstmentService = /** @class */ (function () {
    function ReimburstmentService() {
        this.doc = dynamo_1.default;
    }
    ReimburstmentService.prototype.getAllCases = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.doc
                            .scan({ TableName: 'reimbursements' })
                            .promise()
                            .then(function (data) {
                            if (data && data.Items) {
                                log_1.default.debug("data.Items " + JSON.stringify(data.Items));
                                return data.Items;
                            }
                            else {
                                return null;
                            }
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ReimburstmentService.prototype.getCasesByUser = function (username) {
        return __awaiter(this, void 0, void 0, function () {
            var params;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        params = {
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
                        return [4 /*yield*/, this.doc
                                .query(params)
                                .promise()
                                .then(function (data) {
                                if (data && data.Items) {
                                    log_1.default.debug("data.Items " + JSON.stringify(data.Items));
                                    return data.Items;
                                }
                                else {
                                    return null;
                                }
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ReimburstmentService.prototype.getCasesByTitle = function (title) {
        return __awaiter(this, void 0, void 0, function () {
            var params;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        params = {
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
                        return [4 /*yield*/, this.doc
                                .query(params)
                                .promise()
                                .then(function (data) {
                                if (data && data.Items) {
                                    log_1.default.debug("data.Items " + JSON.stringify(data.Items));
                                    return data.Items;
                                }
                                else {
                                    return null;
                                }
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ReimburstmentService.prototype.getCasesByDept = function (dept) {
        return __awaiter(this, void 0, void 0, function () {
            var params;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        params = {
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
                        return [4 /*yield*/, this.doc
                                .query(params)
                                .promise()
                                .then(function (data) {
                                if (data && data.Items) {
                                    log_1.default.debug("data.Items " + JSON.stringify(data.Items));
                                    return data.Items;
                                }
                                else {
                                    return null;
                                }
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ReimburstmentService.prototype.getCasesByStatus = function (status) {
        return __awaiter(this, void 0, void 0, function () {
            var params;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        params = {
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
                        return [4 /*yield*/, this.doc
                                .query(params)
                                .promise()
                                .then(function (data) {
                                if (data && data.Items) {
                                    log_1.default.debug("data.Items " + JSON.stringify(data.Items));
                                    return data.Items;
                                }
                                else {
                                    return null;
                                }
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ReimburstmentService.prototype.addCase = function (reimbursement) {
        return __awaiter(this, void 0, void 0, function () {
            var params;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        params = {
                            TableName: 'reimbursements',
                            Item: reimbursement,
                        };
                        return [4 /*yield*/, this.doc
                                .put(params)
                                .promise()
                                .then(function (result) {
                                log_1.default.info('Successfully created item');
                                return true;
                            })
                                .catch(function (error) {
                                log_1.default.error(error);
                                return false;
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ReimburstmentService.prototype.updateCase = function (reimbursement) {
        return __awaiter(this, void 0, void 0, function () {
            var params;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        params = {
                            TableName: 'reimbursements',
                            Key: {
                                created: reimbursement.created,
                            },
                            UpdateExpression: 'set grade_format = :grade, #s = :stat, isUrgent = :u, isExceeding = :x, super_approval = :sa, head_approval = :ha, benco_approval = :ba, additional_info = :add, approved_amount = :app, reasonToExceed = :rte, reasonToDeny = :rtd, info_request = :req',
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
                        return [4 /*yield*/, this.doc
                                .update(params)
                                .promise()
                                .then(function (data) {
                                log_1.default.debug(data);
                                return true;
                            })
                                .catch(function (error) {
                                log_1.default.error(error);
                                return false;
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ReimburstmentService.prototype.deleteCase = function (user, created) {
        return __awaiter(this, void 0, void 0, function () {
            var params;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        params = {
                            TableName: 'reimbursements',
                            Key: {
                                created: created,
                            },
                            ConditionExpression: 'created = :c',
                            ExpressionAttributeValues: {
                                ':c': created,
                            },
                        };
                        return [4 /*yield*/, this.doc
                                .delete(params)
                                .promise()
                                .then(function (data) {
                                log_1.default.info('Case deleted', data);
                                return true;
                            })
                                .catch(function (error) {
                                log_1.default.error(error);
                                return false;
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return ReimburstmentService;
}());
var reimbursementService = new ReimburstmentService();
exports.default = reimbursementService;
