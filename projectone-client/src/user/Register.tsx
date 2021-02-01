import React, { SyntheticEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';
import userService from '../services/user.service';
import { User } from '../types/user';

function Register() {
	const DEPT = ['Engineering', 'Sales', 'BenCo'];

	const ENGINEERING = ['Engineering I', 'Engineering II', 'Engineering III'];

	const SALES = ['Sales Associate', 'Sales Engineer'];

	const BENCO = ['BenCo'];

	const [error, setError] = useState({ error: '' });
	const [inputs, setInputs] = useState(
		new User('', '', '', '', 'Engineering', 'Engineering I', '', '', 1000, 0, 0)
	);
	const [deptInput, setDept] = useState('Engineering');
	const [titles, setTitles] = useState<JSX.Element[]>(
		ENGINEERING.map((title, index) => (
			<option key={'title' + index} value={title}>
				{title}
			</option>
		))
	);

	const history = useHistory();

	const deptChange = (e: SyntheticEvent) => {
		let newInput = { ...inputs };
		newInput.dept = (e.target as HTMLInputElement).value;
		setDept((e.target as HTMLInputElement).value);
		let newTitles: JSX.Element[];
		if ((e.target as HTMLInputElement).value === 'Engineering') {
			newTitles = ENGINEERING.map((title, index) => {
				if (index === 0) {
					return (
						<option key={'title' + index} defaultValue={title}>
							{title}
						</option>
					);
				} else {
					return (
						<option key={'title' + index} value={title}>
							{title}
						</option>
					);
				}
			});
			newInput.title = 'Engineering I';
			setInputs(newInput);
			setTitles(newTitles);
		}
		if ((e.target as HTMLInputElement).value === 'Sales') {
			newTitles = SALES.map((title, index) => {
				if (index === 0) {
					return (
						<option key={'title' + index} defaultValue={title}>
							{title}
						</option>
					);
				} else {
					return (
						<option key={'title' + index} value={title}>
							{title}
						</option>
					);
				}
			});
			newInput.title = 'Sales Associate';
			setInputs(newInput);
			setTitles(newTitles);
		}
		if ((e.target as HTMLInputElement).value === 'BenCo') {
			newTitles = BENCO.map((title, index) => {
				if (index === 0) {
					return (
						<option key={'title' + index} defaultValue={title}>
							{title}
						</option>
					);
				} else {
					return (
						<option key={'title' + index} value={title}>
							{title}
						</option>
					);
				}
			});
			newInput.title = 'BenCo';
			setInputs(newInput);
			setTitles(newTitles);
		}
	};

	const handleFormInput = (e: SyntheticEvent) => {
		let newInput = { ...inputs };

		switch ((e.target as HTMLInputElement).name) {
			case 'username':
				newInput.username = (e.target as HTMLInputElement).value;
				break;
			case 'password':
				newInput.password = (e.target as HTMLInputElement).value;
				break;
			case 'fname':
				newInput.fname = (e.target as HTMLInputElement).value;
				break;
			case 'lname':
				newInput.lname = (e.target as HTMLInputElement).value;
				break;
			case 'title':
				newInput.title = (e.target as HTMLInputElement).value;
				break;
		}
		setInputs(newInput);
	};

	const handleSubmit = async (e: SyntheticEvent) => {
		e.preventDefault();

		setError({ error: '' });

		if (inputs.username === '') {
			setError({ error: 'Enter username' });
		} else if (inputs.password === '') {
			setError({ error: 'Enter password' });
		} else if (inputs.fname === '') {
			setError({ error: 'Enter first name' });
		} else if (inputs.lname === '') {
			setError({ error: 'Enter last name' });
		} else {
			const readyInputs = { ...inputs };
			readyInputs.dept = deptInput;

			await userService
				.getSuper(deptInput + ' Head')
				.then((users) => {
					if (readyInputs.title === 'BenCo') {
						readyInputs.supervisor = users[0].username;
					}
					readyInputs.dept_head = users[0].username;
				})
				.catch((err) => {
					setError({ error: err.message });
				});
			if (readyInputs.title !== 'BenCo') {
				await userService
					.getSuper(readyInputs.title + ' Supervisor')
					.then((users) => {
						readyInputs.supervisor = users[0].username;
					})
					.catch((err) => {
						setError({ error: err.message });
					});
			}
			setTimeout(() => {
				console.log('readyInputs', readyInputs);
				userService
					.addUser(readyInputs)
					.then((user) => {
						history.push('/');
					})
					.catch((err) => {
						setError({ error: err.message });
					});
			}, 5000);
		}
	};

	return (
		<main className="login">
			<header className="login-header">
				<h1>Tuition Reimbursement Management System</h1>
				<button
					type="button"
					onClick={() => {
						history.goBack();
					}}
				>
					Go Back
				</button>
			</header>

			<form className="login-form" onSubmit={(ev) => handleSubmit(ev)}>
				<h2>Register</h2>
				{error && <p className="error">{error.error}</p>}
				<label htmlFor="fname">First Name</label>
				<input
					id="fname"
					name="fname"
					type="text"
					placeholder="First Name"
					onChange={handleFormInput}
				/>
				<br />
				<label htmlFor="lname">Last Name</label>
				<input
					id="lname"
					name="lname"
					type="text"
					placeholder="Last Name"
					onChange={handleFormInput}
				/>
				<br />
				<label htmlFor="username">Username</label>
				<input
					id="username"
					name="username"
					type="text"
					placeholder="Username"
					onChange={handleFormInput}
				/>
				<br />
				<label htmlFor="password">Password</label>
				<input
					id="password"
					name="password"
					type="password"
					placeholder="password"
					onChange={handleFormInput}
				/>
				<br />
				<label htmlFor="dept">Department</label>
				<select id="dept" name="dept" onChange={deptChange}>
					{DEPT.map((dept, index) => {
						if (index === 0) {
							return (
								<option key={'dept' + index} defaultValue={dept}>
									{dept}
								</option>
							);
						} else {
							return (
								<option key={'dept' + index} value={dept}>
									{dept}
								</option>
							);
						}
					})}
				</select>
				<label htmlFor="title">Title</label>
				<select id="title" name="title" onChange={handleFormInput}>
					{titles}
				</select>
				<button type="submit">Register</button>
			</form>
		</main>
	);
}

export default Register;
