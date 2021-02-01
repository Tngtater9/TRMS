import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Header from '../Header/Header';
import { CaseState, UserState } from '../redux/reducer';
import * as Actions from '../redux/actions';
import caseService from '../services/case.service';
import moment from 'moment';

function CaseDetails(props: any) {
	const history = useHistory();
	const dispatch = useDispatch();
	const userSelector = (state: UserState) => state.user;
	const user = useSelector(userSelector);
	const caseSelector = (state: CaseState) => state.selected_case;
	const selected_case = useSelector(caseSelector);
	const casesSelector = (state: CaseState) => state.cases;
	const allCases = useSelector(casesSelector);
	const id = props.match.params.id;

	useEffect(() => {
		const select = allCases.find((c) => c.created === id);
		if (select) dispatch(Actions.changeCase(select));
	}, [allCases, dispatch, id]);

	return (
		<main>
			<Header />
			<h2>Case Details</h2>
			{user.username === selected_case.username &&
				selected_case.projected_amount !== selected_case.approved_amount &&
				selected_case.approved_amount !== 0 && (
					<section className="case-info">
						<p>
							The approved amount{' '}
							{selected_case.projected_amount < selected_case.approved_amount
								? 'exceeds'
								: 'is less than'}{' '}
							the projected amount. To cancel click the button below:
						</p>
						<button
							onClick={() => {
								caseService
									.deleteCase(selected_case.created)
									.then(() => history.push('/dashboard'));
							}}
						>
							Cancel Reimbursement
						</button>
						<button
							onClick={() => {
								caseService
									.deleteCase(selected_case.created)
									.then(() => history.push('/dashboard'));
							}}
						>
							Approve Reimbursement
						</button>
					</section>
				)}
			<p>
				Name: {selected_case.fname} {selected_case.lname}
			</p>
			<br />
			<p>Title: {selected_case.title}</p>
			<br />
			<p>Created: {moment(selected_case.created).format('LL')}</p>
			<br />
			<p>Status: {selected_case.status}</p>
			<br />
			<p>Projected Amount: ${selected_case.projected_amount.toFixed(2)}</p>
			<br />
			{selected_case.approved_amount !== 0 && (
				<>
					<p>Approved Amount: ${selected_case.approved_amount.toFixed(2)}</p>
					<br />
				</>
			)}
			<p>Event Date: {moment(selected_case.event_date).format('LL')}</p>
			<br />
			<p>Event Time: {selected_case.event_time}</p>
			<br />
			<p>Event Location: {selected_case.event_location}</p>
			<br />
			<p>Event Description: {selected_case.event_description}</p>
			<br />
			<p>Event Cost: ${(selected_case.event_cost as Number).toFixed(2)}</p>
			<br />
			<p>Event Type: {selected_case.event_type}</p>
			<br />
			<p>Justification: {selected_case.justification}</p>
			<br />
			<p>Work to be missed: {selected_case.missed_work}</p>
			<br />
			<p>Grade Type: {selected_case.grade_format.type}</p>
			<br />
			{selected_case.grade_format.grade_cutoff && (
				<>
					<p>Grade Cutoff: {selected_case.grade_format.grade_cutoff}</p>
					<br />
				</>
			)}
			{selected_case.grade_format.grade && (
				<>
					<p>Grade: {selected_case.grade_format.grade}</p>
					<br />
				</>
			)}
			<h4>Information Requests</h4>
			{selected_case.info_request && selected_case.info_request.length > 0 ? (
				selected_case.info_request.map((req) => (
					<section className="case-info">
						<p>Created: {req.created}</p>
						<br />
						<p>Requester: {req.requested_by}</p>
						<br />
						<p>Requested From: {req.requested_from}</p>
						<br />
						<p>Description: {req.description}</p>
						<br />
					</section>
				))
			) : (
				<p>No Requests</p>
			)}
			<h4>Additional Information</h4>
			{selected_case.additional_info &&
			selected_case.additional_info.length > 0 ? (
				selected_case.additional_info.map((info) => (
					<section className="case-info">
						<p>Created: {info.created}</p>
						<br />
						<p>From: {info.from}</p>
						<br />
						<p>Type: {info.type}</p>
						<br />
						<p>Description: {info.description}</p>
						<br />
					</section>
				))
			) : (
				<p>No Additional Information</p>
			)}
		</main>
	);
}

export default CaseDetails;
