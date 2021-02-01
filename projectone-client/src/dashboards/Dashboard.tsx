import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CaseState, UIState, UserState } from '../redux/reducer';
import * as Actions from '../redux/actions';
import caseService from '../services/case.service';
import CaseListWrapper from './CaseListWrapper';
import Header from '../Header/Header';

function Dashboard() {
	const dispatch = useDispatch();
	const userSelector = (state: UserState) => state.user;
	const user = useSelector(userSelector);
	const allCaseSelector = (state: CaseState) => state.cases;
	const allCases = useSelector(allCaseSelector);
	const viewSelector = (state: UIState) => state.view;
	const view = useSelector(viewSelector);

	useEffect(() => {
		if (user.title.includes('Head') && user.title !== 'BenCo Head') {
			caseService.getCasesByDept(user.dept).then((res) => {
				dispatch(Actions.getCases(res));
			});
		} else if (user.title.includes('Supervisor')) {
			let subdept = user.title.replace(' Supervisor', '');
			caseService.getCasesByTitle(subdept).then((res) => {
				dispatch(Actions.getCases(res));
			});
		} else if (user.title.includes('BenCo')) {
			caseService.getAllCases().then((res) => {
				dispatch(Actions.getCases(res));
			});
		} else {
			caseService.getCasesByUser(user.username).then((res) => {
				dispatch(Actions.getCases(res));
			});
		}
	}, [dispatch, user.dept, user.title, user.username]);

	useEffect(() => {
		const everyCase = [...allCases];
		if (view !== 'Urgent' && view !== 'Exceeding') {
			const result = everyCase.filter((c) => c.status === view);
			dispatch(Actions.changeSelectedCases(result));
		} else if (view === 'Urgent') {
			const result = everyCase.filter((c) => c.isUrgent === true);
			dispatch(Actions.changeSelectedCases(result));
		} else {
			const result = everyCase.filter((c) => c.isExceeding === true);
			dispatch(Actions.changeSelectedCases(result));
		}
	}, [allCases, dispatch, view]);

	return (
		<main className="dashboard">
			<Header />
			<h1 className="dash-title">{view}</h1>
			<CaseListWrapper />
		</main>
	);
}

export default Dashboard;
