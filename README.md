# Tuition Reimbursement Management System

## Project Description

Tuition Reimbursement Management System is a full-stack web application that allows employees to submit requests for reimbursements for courses, events, and certifications. These requests can then be approved or rejected by the employee's direct supervisor, department head, and a benefits coordinator while the employee is able to track the status of their requests.

## Technologies Used

- React
- Typescript
- Express
- Redux
- HTML
- CSS
- DynamoDB

## Features

List of features ready and TODOs for future development

- As a user, I can create, view, edit, and delete reimbursement cases.
- As the system, it can update cases to urgent or reject them if they are past the cut off date.
- As management, I can grade and approve reimbursement cases.

To-do list:

- Improve UI, i.e. providing a view all cases regardless of status
- Provided more user friendly error messages

## Getting Started

1. `git clone`
2. Add environment variables.

- For client: REACT*APP_SERVER_URI = \_URI server is running on*
- For server: CLIENT = _URI client is running on_
  PORT = _Port you want the server to run on_

3. `npm install --save`
4. Configure AWS with access key and secret key
5. While in server folder `npm run setup`

- If not in region `us-west-2` change region in `createTable.ts`
- If you want to use the management staff I created as a starting point `npm run seed` _WARNING: If you do not use these seeds you will have to create a seed file with management with the same roles for registration to work._

6. While in server folder `npm start`
7. While in client folder `npm start`
8. Enjoy

## Usage

First login or register a new user:
![Login Page](/Screenshots/login.png 'Login Page')

The user dashboard:
![Dashboard](/Screenshots/inital-dashboard.png 'Dashboard')

To create a new case click `Add Case`:
![Create a case](/Screenshots/create-case.png 'Create a case')
![Created case on dashboard](/Screenshots/after-case-creation.png 'Created case on dashboard')
![Case Details](/Screenshots/case-details.png 'Case details')

To request information from a user about the case click `Request Info`:
![Request Info Form](/Screenshots/req-info.png 'Request Info Form')
![Info Request Details](/Screenshots/info-details.png 'Info Request Details')

To additional information from a user about the case click `Add Info`:
![Additional Info Form](/Screenshots/add-info.png 'Additional Info Form')
![Additional Info Details](/Screenshots/add-details.png 'Additional Info Details')

Once the case has been approved by the supervisor and department head the BenCo can approve or deny the case:
![Case Review](/Screenshots/in-review.png 'Case Review')
