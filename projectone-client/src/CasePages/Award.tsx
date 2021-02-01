import React, { SyntheticEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { CaseState } from '../redux/reducer';
import * as Actions from '../redux/actions';
import userService from '../services/user.service';
import caseService from '../services/case.service';
import Header from '../Header/Header';
import { User } from '../types/user';

function Award(props: any) {
	const [error, setError] = useState({ error: '' });
	const [approved, setApproved] = useState('0');
	const [exceeding, setExceeding] = useState('');
	const [receipent, setReceipent] = useState(new User());

	const history = useHistory();
	const dispatch = useDispatch();
	const caseSelector = (state: CaseState) => state.selected_case;
	const selectedCase = useSelector(caseSelector);
	const casesSelector = (state: CaseState) => state.cases;
	const allCases = useSelector(casesSelector);
	const id = props.match.params.id;

	useEffect(() => {
		const select = allCases.find((c) => c.created === id);
		if (select) dispatch(Actions.changeCase(select));
	}, [allCases, dispatch, id]);

	useEffect(() => {
		userService
			.getUser(selectedCase.username)
			.then((res) => {
				setReceipent(res);
			})
			.catch((err) => {
				setError({ error: err.message });
			});
	}, [selectedCase.username]);

	const handleSubmit = (e: SyntheticEvent) => {
		e.preventDefault();

		setError({ error: '' });

		if (approved === '') {
			setError({ error: 'Approved Reimbursement Amount required' });
		} else if (receipent.avail_funds < Number(approved) && exceeding === '') {
			setError({ error: 'Reason to Exceed Available Funds required' });
		} else {
			const updatedCase = { ...selectedCase };
			const updatedUser = { ...receipent };

			updatedCase.approved_amount = Number(approved);
			updatedCase.status = 'Awarded';

			if (exceeding !== '') {
				updatedCase.reasonToExceed = exceeding;
				updatedCase.isExceeding = true;
			}

			if (updatedUser.pending_funds) {
				updatedUser.pending_funds -= selectedCase.projected_amount;
				updatedUser.pending_funds += Number(approved);
			} else {
				updatedUser.pending_funds = Number(approved);
			}

			if (updatedUser.awarded_funds && updatedUser.pending_funds) {
				updatedUser.pending_funds -= selectedCase.projected_amount;
				updatedUser.awarded_funds += Number(approved);
			} else if (updatedUser.pending_funds) {
				updatedUser.pending_funds -= selectedCase.projected_amount;
				updatedUser.awarded_funds = Number(approved);
			}

			updatedUser.avail_funds =
				updatedUser.avail_funds -
				updatedUser.pending_funds -
				updatedUser.awarded_funds;

			if (updatedUser.avail_funds < 0) {
				updatedUser.awarded_funds =
					updatedUser.awarded_funds + updatedUser.avail_funds;
				updatedUser.avail_funds = 0;
			}

			caseService.updateCase(updatedCase);
			userService
				.updateUser(updatedUser)
				.then(() => history.push('/dashboard'));
		}
	};

	return (
		<main>
			<Header />
			{error.error !== '' && <p className="error">{error.error}</p>}
			<form onSubmit={handleSubmit}>
				<h2>Award Form</h2>
				<p>Event Cost is ${(selectedCase.event_cost as Number).toFixed(2)}</p>
				<p>Available Reimbursement: ${receipent.avail_funds.toFixed(2)}</p>
				<p>
					Projected Reimbursement Amount: $
					{selectedCase.projected_amount.toFixed(2)}
				</p>
				<label htmlFor="approved">Approved Reimbursement Amount</label>
				<br />
				<input
					required
					id="approved"
					name="approved"
					type="number"
					value={approved}
					onChange={(e) => {
						setApproved(e.target.value);
					}}
				/>
				<br />
				<br />
				{selectedCase.projected_amount < Number(approved) && (
					<>
						<label htmlFor="exceedingReason">
							Reason to Exceed Projected Amount:
						</label>
						<br />
						<textarea
							required
							id="exceedingReason"
							name="exceedingReason"
							value={exceeding}
							onChange={(e) => setExceeding(e.target.value)}
						/>
						<br />
						<br />
					</>
				)}
				<button type="submit" onClick={handleSubmit}>
					Submit
				</button>
			</form>
		</main>
	);
}

export default Award;
