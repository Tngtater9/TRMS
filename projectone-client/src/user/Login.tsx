import React, { SyntheticEvent, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { UserState } from '../redux/reducer';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, loginAction } from '../redux/actions';
import userService from '../services/user.service';
import { LoginCreds } from '../types/user';
import './Login.css';

function LoginComponent() {
	const [error, setError] = useState({ error: '' });
	const dispatch = useDispatch();
	const history = useHistory();

	const loginSelector = (state: UserState) => state.loginCreds;
	const login = useSelector(loginSelector);

	const handleFormInput = (ev: SyntheticEvent) => {
		let input: LoginCreds = { ...login };
		if ((ev.target as HTMLInputElement).name === 'username') {
			input.username = (ev.target as HTMLInputElement).value;
		} else {
			input.password = (ev.target as HTMLInputElement).value;
		}
		dispatch(loginAction(input));
	};

	const handleSubmit = (ev: SyntheticEvent) => {
		ev.preventDefault();

		setError({ error: '' });

		if (login.username === '') {
			setError({ error: 'Enter username' });
		} else if (login.password === '') {
			setError({ error: 'Enter password' });
		} else {
			userService
				.login(login)
				.then((user) => {
					dispatch(getUser(user));
					history.push('/dashboard');
				})
				.catch((err) => {
					setError({ error: err.message });
				});
		}
	};
	return (
		<main className="login">
			<header className="login-header">
				<h1>Tuition Reimbursement Management System</h1>
			</header>
			<form className="login-form" onSubmit={(ev) => handleSubmit(ev)}>
				<h2>Log In</h2>
				{error.error !== '' && <p className="error">{error.error}</p>}
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

				<button type="submit">Log In</button>
				<Link to="/register">Create an account</Link>
			</form>
		</main>
	);
}

export default LoginComponent;
