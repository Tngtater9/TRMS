"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var user_1 = require("../users/user");
var users_service_1 = __importDefault(require("../users/users.service"));
function populateManagementUserTable() {
    setTimeout(function () {
        users_service_1.default
            .addUser(new user_1.User('enghead', 'pass', 'Jamie', 'Tater', 'Engineering', 'Engineering Head', 'Regional Manager', 'Regional Manager', 1000, 0, 0))
            .then(function () { });
        users_service_1.default
            .addUser(new user_1.User('salehead', 'pass', 'Mal', 'Rivera', 'Sales', 'Sales Head', 'Regional Manager', 'Regional Manager', 1000, 0, 0))
            .then(function () { });
        users_service_1.default
            .addUser(new user_1.User('bencohead', 'pass', 'Jacques', 'Maurice', 'BenCo', 'BenCo Head', 'Regional Manager', 'Regional Manager', 1000, 0, 0))
            .then(function () { });
        users_service_1.default
            .addUser(new user_1.User('sasuper', 'pass', 'Sally', 'Harper', 'Sales', 'Sales Associate Supervisor', 'Sales Head', 'Sales Head', 1000, 0, 0))
            .then(function () { });
        users_service_1.default
            .addUser(new user_1.User('sesuper', 'pass', 'Donnie', 'Platt', 'Sales', 'Sales Engineer Supervisor', 'Sales Head', 'Sales Head', 1000, 0, 0))
            .then(function () { });
        users_service_1.default
            .addUser(new user_1.User('engthreesuper', 'pass', 'Chris', 'Brown', 'Engineering', 'Engineering III Supervisor', 'Engineering Head', 'Engineering Head', 1000, 0, 0))
            .then(function () { });
        users_service_1.default
            .addUser(new user_1.User('engtwosuper', 'pass', 'Ellie', 'Isgett', 'Engineering', 'Engineering II Supervisor', 'Engineering Head', 'Engineering Head', 1000, 0, 0))
            .then(function () { });
        users_service_1.default
            .addUser(new user_1.User('engonesuper', 'pass', 'Ruby', 'Taylor', 'Engineering', 'Engineering I Supervisor', 'Engineering Head', 'Engineering Head', 1000, 0, 0))
            .then(function () { });
    });
}
populateManagementUserTable();
