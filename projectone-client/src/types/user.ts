export class User {
	constructor(
		public username: string = '',
		public password: string = '',
		public fname: string = '',
		public lname: string = '',
		public dept: string = '',
		public title: string = '',
		public supervisor: string = '',
		public dept_head: string = '',
		public avail_funds: number = 1000,
		public pending_funds: number = 0,
		public awarded_funds: number = 0
	) {}
}

export class LoginCreds {
	constructor(public username: string = '', public password: string = '') {}
}
