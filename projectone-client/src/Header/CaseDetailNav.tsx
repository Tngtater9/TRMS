import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { CaseState, UserState } from '../redux/reducer';
import * as Actions from '../redux/actions';
import caseService from '../services/case.service';
import userService from '../services/user.service';
import { User } from '../types/user';

function CaseDetailNav() {
	const history = useHistory();
	const dispatch = useDispatch();
	const userSelector = (state: UserState) => state.user;
	const user = useSelector(userSelector);
	const caseSelector = (state: CaseState) => state.selected_case;
	const selectedCase = useSelector(caseSelector);

	const approveCase = async () => {
		const updatedCase = { ...selectedCase };
		if (user.title.includes('Supervisor')) {
			updatedCase.super_approval = `${user.fname} ${
				user.lname
			} ${new Date().toISOString()}`;
			updatedCase.status = 'In Dept Head Review';
			await caseService.updateCase(updatedCase).then(() => {
				dispatch(Actions.changeCase(updatedCase));
			});
		}
		if (user.title.includes('Head')) {
			updatedCase.head_approval = `${user.fname} ${
				user.lname
			} ${new Date().toISOString()}`;
			updatedCase.status = 'In BenCo Review';
			await caseService.updateCase(updatedCase).then(() => {
				dispatch(Actions.changeCase(updatedCase));
			});
		}
		if (user.title.includes('BenCo')) {
			updatedCase.benco_approval = `${user.fname} ${
				user.lname
			} ${new Date().toISOString()}`;
			updatedCase.status = 'Pending';
			let updatedUser: User = new User();
			await userService.getUser(selectedCase.username).then((res) => {
				updatedUser = { ...res };
				updatedUser.pending_funds =
					updatedUser.pending_funds + selectedCase.projected_amount;
				updatedUser.avail_funds =
					updatedUser.avail_funds -
					updatedUser.pending_funds -
					updatedUser.awarded_funds;
			});
			await userService.updateUser(updatedUser);
			await caseService.updateCase(updatedCase).then(() => {
				dispatch(Actions.changeCase(updatedCase));
			});
		}
	};

	return (
		<nav>
			<Link to="/dashboard">Dashboard</Link>
			{user.title.includes('Supervisor') &&
				selectedCase.status === 'In Supervisor Review' && (
					<button onClick={approveCase}>Approve</button>
				)}
			{user.title.includes('Head') &&
				selectedCase.status === 'In Dept Head Review' && (
					<button onClick={approveCase}>Approve</button>
				)}
			{user.title.includes('BenCo') &&
				selectedCase.status === 'In BenCo Review' && (
					<button onClick={approveCase}>Approve</button>
				)}
			{((user.title.includes('Supervisor') &&
				selectedCase.status === 'In Supervisor Review') ||
				(user.title.includes('Head') &&
					selectedCase.status === 'In Dept Head Review') ||
				(user.title.includes('BenCo') &&
					selectedCase.status === 'In BenCo Review')) && (
				<Link to={`/deny/${selectedCase.created}`}>Deny</Link>
			)}
			{selectedCase.grade_format.approval_date &&
				user.title.includes('BenCo') &&
				selectedCase.status === 'Pending' && (
					<Link to={`/award/${selectedCase.created}`}>Award</Link>
				)}
			{((!selectedCase.grade_format.approval_date &&
				user.title.includes('BenCo') &&
				selectedCase.status === 'Pending' &&
				new Date(selectedCase.event_date) < new Date()) ||
				(!selectedCase.grade_format.approval_date &&
					user.title.includes('Supervisor') &&
					!selectedCase.title.includes('Supervisor') &&
					selectedCase.grade_format.type === 'Presentation' &&
					selectedCase.status === 'Pending' &&
					new Date(selectedCase.event_date) < new Date()) ||
				(!selectedCase.grade_format.approval_date &&
					user.title.includes('Head') &&
					selectedCase.title.includes('Supervisor') &&
					selectedCase.grade_format.type === 'Presentation' &&
					selectedCase.status === 'Pending' &&
					new Date(selectedCase.event_date) < new Date())) && (
				<Link to={`/grade/${selectedCase.created}`}>Grade</Link>
			)}
			<Link to={`/addInfo/${selectedCase.created}`}>Add Info</Link>
			{(user.title.includes('Supervisor') ||
				user.title.includes('Head') ||
				user.title.includes('BenCo')) && (
				<Link to={`/reqInfo/${selectedCase.created}`}>Request Info</Link>
			)}
			{(user.username === selectedCase.username ||
				user.title === 'BenCo Head') && (
				<button
					onClick={() => {
						caseService.deleteCase(selectedCase.created).then(() => {
							history.push('/dashboard');
						});
					}}
				>
					Delete
				</button>
			)}
		</nav>
	);
}

export default CaseDetailNav;
