import { User } from '../users/user';
import usersService from '../users/users.service';

function populateManagementUserTable() {
	setTimeout(() => {
		usersService
			.addUser(
				new User(
					'enghead',
					'pass',
					'Jamie',
					'Tater',
					'Engineering',
					'Engineering Head',
					'Regional Manager',
					'Regional Manager',
					1000,
					0,
					0
				)
			)
			.then(() => {});
		usersService
			.addUser(
				new User(
					'salehead',
					'pass',
					'Mal',
					'Rivera',
					'Sales',
					'Sales Head',
					'Regional Manager',
					'Regional Manager',
					1000,
					0,
					0
				)
			)
			.then(() => {});
		usersService
			.addUser(
				new User(
					'bencohead',
					'pass',
					'Jacques',
					'Maurice',
					'BenCo',
					'BenCo Head',
					'Regional Manager',
					'Regional Manager',
					1000,
					0,
					0
				)
			)
			.then(() => {});
		usersService
			.addUser(
				new User(
					'sasuper',
					'pass',
					'Sally',
					'Harper',
					'Sales',
					'Sales Associate Supervisor',
					'Sales Head',
					'Sales Head',
					1000,
					0,
					0
				)
			)
			.then(() => {});
		usersService
			.addUser(
				new User(
					'sesuper',
					'pass',
					'Donnie',
					'Platt',
					'Sales',
					'Sales Engineer Supervisor',
					'Sales Head',
					'Sales Head',
					1000,
					0,
					0
				)
			)
			.then(() => {});
		usersService
			.addUser(
				new User(
					'engthreesuper',
					'pass',
					'Chris',
					'Brown',
					'Engineering',
					'Engineering III Supervisor',
					'Engineering Head',
					'Engineering Head',
					1000,
					0,
					0
				)
			)
			.then(() => {});
		usersService
			.addUser(
				new User(
					'engtwosuper',
					'pass',
					'Ellie',
					'Isgett',
					'Engineering',
					'Engineering II Supervisor',
					'Engineering Head',
					'Engineering Head',
					1000,
					0,
					0
				)
			)
			.then(() => {});
		usersService
			.addUser(
				new User(
					'engonesuper',
					'pass',
					'Ruby',
					'Taylor',
					'Engineering',
					'Engineering I Supervisor',
					'Engineering Head',
					'Engineering Head',
					1000,
					0,
					0
				)
			)
			.then(() => {});
	});
}
populateManagementUserTable();
