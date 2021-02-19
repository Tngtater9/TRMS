import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { UserState } from '../redux/reducer';
import { User } from '../types/user';
import * as Actions from '../redux/actions';
import userService from '../services/user.service';
import DashNav from './DashNav';
import CaseDetailNav from './CaseDetailNav';
import './Header.css';
import { Grade_format, Reimburstment } from '../types/reimburstments';

function Header() {
	const history = useHistory();
	const location = useLocation();
	const dispatch = useDispatch();
	const userSelector = (state: UserState) => state.user;
	const user = useSelector(userSelector);

	const logout = () => {
		userService.logout().then(() => {
			dispatch(Actions.getUser(new User()));
			dispatch(Actions.changeView('Urgent'));
			dispatch(
				Actions.caseInputAction(
					new Reimburstment(
						'',
						'',
						'',
						'',
						'',
						'',
						'In Supervisor Review',
						'',
						'',
						'',
						'',
						'0',
						'University Course',
						0,
						'',
						'',
						new Grade_format('Passing Grade', '70%', ''),
						false,
						false,
						0,
						'',
						'',
						'',
						[],
						'',
						'',
						[]
					)
				)
			);
			history.push('/');
		});
	};

	const back = () => {
		history.goBack();
		dispatch(
			Actions.caseInputAction(
				new Reimburstment(
					'',
					'',
					'',
					'',
					'',
					'',
					'In Supervisor Review',
					'',
					'',
					'',
					'',
					'0',
					'University Course',
					0,
					'',
					'',
					new Grade_format('Passing Grade', '', ''),
					false,
					false,
					0,
					'',
					'',
					'',
					[],
					'',
					'',
					[]
				)
			)
		);
	};

	return (
		<>
			<header>
				<h1>
					TRMS
					{user.username && ' | Welcome, ' + user.fname + ' ' + user.lname}
				</h1>
				{user.username && <button onClick={logout}>Log Out</button>}
			</header>
			{location.pathname === '/dashboard' && <DashNav />}
			{location.pathname.includes('/caseDetails') && <CaseDetailNav />}
			{location.pathname !== '/dashboard' &&
				!location.pathname.includes('/caseDetails') && (
					<nav>
						<button onClick={back}>Go Back</button>
					</nav>
				)}
		</>
	);
}

export default Header;
