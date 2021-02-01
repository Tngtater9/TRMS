import React, { SyntheticEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Header from '../Header/Header';
import { CaseState } from '../redux/reducer';
import * as Actions from '../redux/actions';
import caseService from '../services/case.service';

function DenyCase(props: any) {
	const [error, setError] = useState({ error: '' });
	const [deny, setDeny] = useState('');

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

	const handleSubmit = (e: SyntheticEvent) => {
		e.preventDefault();

		setError({ error: '' });

		if (deny === '') {
			setError({ error: 'Reason to Deny required' });
		} else {
			const updatedCase = { ...selectedCase };
			updatedCase.reasonToDeny = deny;
			updatedCase.status = 'Rejected';
			caseService
				.updateCase(updatedCase)
				.then(() => history.push('/dashboard'))
				.catch((err) => {
					setError({ error: err.message });
				});
		}
	};

	return (
		<main>
			<Header />
			<h2>Deny Case</h2>
			{error.error !== '' && <p className="error">{error.error}</p>}
			<form onSubmit={handleSubmit}>
				<label htmlFor="denyReason">Reason to Exceed Available Amount:</label>
				<br />
				<textarea
					required
					id="denyReason"
					name="denyReason"
					value={deny}
					onChange={(e) => setDeny(e.target.value)}
				/>
				<button type="submit" onClick={handleSubmit}>
					Submit
				</button>
			</form>
		</main>
	);
}

export default DenyCase;
