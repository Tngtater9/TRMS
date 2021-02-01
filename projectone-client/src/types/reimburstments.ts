export class Reimburstment {
	constructor(
		public username: string = '',
		public fname: string = '',
		public lname: string = '',
		public title: string = '',
		public dept: string = '',
		public created: string = '',
		public status: string = '',
		public event_date: string = '',
		public event_time: string = '',
		public event_location: string = '',
		public event_description: string = '',
		public event_cost: number | string = 0,
		public event_type: string = '',
		public projected_amount: number = 0,
		public justification: string = '',
		public missed_work: string = '',
		public grade_format: Grade_format = { type: '' },
		public isUrgent: boolean = false,
		public isExceeding: boolean = false,
		public approved_amount: number = 0,
		public super_approval?: string,
		public head_approval?: string,
		public benco_approval?: string,
		public additional_info?: Additional_doc[],
		public reasonToExceed?: string,
		public reasonToDeny?: string,
		public info_request?: Info_req[]
	) {}
}

export class Grade_format {
	constructor(
		public type: string = '',
		public grade_cutoff?: string,
		public grade?: string,
		public approval_date?: string,
		public approver?: string
	) {}
}

export class Additional_doc {
	constructor(
		public created: string = '',
		public from: string = '',
		public type: string = '',
		public description: string = '',
		public document?: any
	) {}
}

export class Info_req {
	constructor(
		public created: string = '',
		public requested_by: string = '',
		public requested_from: string = '',
		public description: string = ''
	) {}
}
