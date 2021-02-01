# About the Tuition Reimbursement Server

This is an Express server run using Nodejs to communicate with the DynamoDB database. To get started use `npm i` and create a .env file. Use `createTable.ts` in the `setup` folder to create DynamoDB tables. Use the `seedTable.ts` or a similar file to populate the user table with managers for the organization. Then `npm start`.

## Endpoints

There are two resources for this API. One for user methods and one for reimbursement case methods.

### `/users`

- GET `/users/` - Checks the session cookies to see if a user is logged in on the client.
- POST `/users/` - Creates a new user in the system
- PUT `/users/` - Updates a user
- DELETE `/users/` - Destroys the user session
- POST `/users/login` - Logs in a user and creates the user session
- GET `/users/:title` - Gets users by job title. Intended to be used to get managers for employee registration.
- GET `/users/:user` - Gets users by username. Intended to be used on the client when information is needed about a user other than the one that is logged in. I.E. when issuing reward amounts.

### `/cases`

- POST `/cases/` - Creates a new reimbursement case in the system
- PUT `/cases/` - Updates a reimbursement case
- GET `/cases/` - Gets all cases and updates them to `Urgent` or `Rejected` if necessary then sends the all of the cases.
- GET `/cases/user/:id` - Gets cases by username has the same update behavior as `/cases/`
- GET `/cases/dept/:id` - Gets cases by department has the same update behavior as `/cases/`
- GET `/cases/title/:id` - Gets cases by job title has the same update behavior as `/cases/`
- GET `/cases/status/:id` - Gets cases by case status has the same update behavior as `/cases/`
- DELETE `/cases/delete/:id` - Deletes a case. The paramater is the date created as an ISO string
