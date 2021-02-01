"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Info_req = exports.Additional_doc = exports.Grade_format = exports.Reimburstment = void 0;
var Reimburstment = /** @class */ (function () {
    function Reimburstment(username, fname, lname, title, dept, created, status, event_date, event_time, event_location, event_description, event_cost, event_type, projected_amount, justification, missed_work, grade_format, isUrgent, isExceeding, super_approval, head_approval, benco_approval, additional_info, reasonToExceed, reasonToDeny, info_request, approved_amount) {
        this.username = username;
        this.fname = fname;
        this.lname = lname;
        this.title = title;
        this.dept = dept;
        this.created = created;
        this.status = status;
        this.event_date = event_date;
        this.event_time = event_time;
        this.event_location = event_location;
        this.event_description = event_description;
        this.event_cost = event_cost;
        this.event_type = event_type;
        this.projected_amount = projected_amount;
        this.justification = justification;
        this.missed_work = missed_work;
        this.grade_format = grade_format;
        this.isUrgent = isUrgent;
        this.isExceeding = isExceeding;
        this.super_approval = super_approval;
        this.head_approval = head_approval;
        this.benco_approval = benco_approval;
        this.additional_info = additional_info;
        this.reasonToExceed = reasonToExceed;
        this.reasonToDeny = reasonToDeny;
        this.info_request = info_request;
        this.approved_amount = approved_amount;
    }
    return Reimburstment;
}());
exports.Reimburstment = Reimburstment;
var Grade_format = /** @class */ (function () {
    function Grade_format(type, grade_cutoff, grade, approval_date, approver) {
        this.type = type;
        this.grade_cutoff = grade_cutoff;
        this.grade = grade;
        this.approval_date = approval_date;
        this.approver = approver;
    }
    return Grade_format;
}());
exports.Grade_format = Grade_format;
var Additional_doc = /** @class */ (function () {
    function Additional_doc(created, from, type, description, document) {
        this.created = created;
        this.from = from;
        this.type = type;
        this.description = description;
        this.document = document;
    }
    return Additional_doc;
}());
exports.Additional_doc = Additional_doc;
var Info_req = /** @class */ (function () {
    function Info_req(created, requested_by, requested_from, description) {
        this.created = created;
        this.requested_by = requested_by;
        this.requested_from = requested_from;
        this.description = description;
    }
    return Info_req;
}());
exports.Info_req = Info_req;
