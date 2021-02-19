# Tuition Reimbursement Management System

## Project Description

Tuition Reimbursement Management System is a full-stack web application that allows employees to submit requests for reimbursements for courses, events, and certifications. These requests can then be approved or rejected by the employee's direct supervisor, department head, and a benefits coordinator while the employee is able to track the status of their requests.

## Technologies Used

* React
* Typescript 
* Express
* Redux
* HTML
* CSS
* DynamoDB

## Features

List of features ready and TODOs for future development
* As a user, I can create, view, edit, and delete reimbursement cases.
* As the system, it can update cases to urgent or reject them if they are past the cut off date.
* As management, I can grade and approve reimbursement cases.

To-do list:
* Improve UI, i.e. providing a view all cases regardless of status
* Provided more user friendly error messages

## Getting Started
   
1. `git clone`
2. Add environment variables. 
  - For client: REACT_APP_SERVER_URI = <URI server is running on>
  - For server: CLIENT = <URI client is running on>
                PORT = <Port you want the server to run on>
3. `npm install --save`
4. Configure AWS with access key and secret key
5. While in server folder `npm run setup`
  - If not in region `us-west-2` change region in `createTable.ts`
  - If you want to use the employees I created as a starting point `npm run seed`
6. While in server folder `npm start`
7. While in client folder `npm start`
8. Enjoy

## Usage

> Here, you instruct other people on how to use your project after they’ve installed it. This would also be a good place to include screenshots of your project in action.

