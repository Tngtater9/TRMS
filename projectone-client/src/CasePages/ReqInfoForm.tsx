import React, { SyntheticEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Header from '../Header/Header';
import { CaseState, UserState } from '../redux/reducer';
import * as Actions from '../redux/actions';
import { Info_req } from '../types/reimburstments';
import caseService from '../services/case.service';

function ReqInfoForm(props: any) {
	const history = useHistory();
	const dispatch = useDispatch();
	const userSelector = (state: UserState) => state.user;
	const user = useSelector(userSelector);
	const caseSelector = (state: CaseState) => state.selected_case;
	const selected_case = useSelector(caseSelector);
	const casesSelector = (state: CaseState) => state.cases;
	const allCases = useSelector(casesSelector);
	const id = props.match.params.id;

	const [error, setError] = useState({ error: '' });
	const [reqFrom, setReq] = useState(selected_case.username);
	const [desc, setDesc] = useState('');

	useEffect(() => {
		const select = allCases.find((c) => c.created === id);
		if (select) dispatch(Actions.changeCase(select));
	}, [allCases, dispatch, id]);

	const handleFormInput = (e: SyntheticEvent) => {
		if ((e.target as HTMLInputElement).name === 'req_from') {
			setReq((e.target as HTMLInputElement).value);
		} else {
			setDesc((e.target as HTMLInputElement).value);
		}
	};

	const handleSubmit = (e: SyntheticEvent) => {
		e.preventDefault();

		setError({ error: '' });

		if (desc === '') {
			setError({ error: 'Description required' });
		} else {
			const newReq = new Info_req(
				new Date().toISOString(),
				`${user.fname} ${user.lname}`,
				reqFrom,
				desc
			);
			const updatedCase = { ...selected_case };
			if (Array.isArray(updatedCase.info_request)) {
				updatedCase.info_request.push(newReq);
			} else {
				updatedCase.info_request = [newReq];
			}

			caseService
				.updateCase(updatedCase)
				.then(() => {
					dispatch(Actions.changeCase(updatedCase));
					history.push('/dashboard');
				})
				.catch((err) => setError({ error: err.message }));
		}
	};

	return (
		<main>
			<Header />
			{error && <p className="error">{error.error}</p>}
			<h2>Request Information</h2>
			<form onSubmit={handleSubmit}>
				<label htmlFor="req_from">Request from:</label>
				<select id="req_from" name="req_from" onChange={handleFormInput}>
					<option defaultValue={selected_case.username}>
						{selected_case.fname} {selected_case.lname}
					</option>
					{!selected_case.title.includes('Supervisor') && (
						<option value={selected_case.title + ' Supervisor'}>
							{selected_case.title + ' Supervisor'}
						</option>
					)}
					<option value={selected_case.title.split(' ')[0] + ' Head'}>
						{selected_case.title.split(' ')[0] + ' Head'}
					</option>
				</select>
				<br />
				<label htmlFor="description">Description:</label>
				<br />
				<textarea required value={desc} onChange={handleFormInput} />
				<button type="submit" onClick={handleSubmit}>
					Submit
				</button>
			</form>
		</main>
	);
}

export default ReqInfoForm;
