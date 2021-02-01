import React, { SyntheticEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Header from '../Header/Header';
import { CaseState, UserState } from '../redux/reducer';
import * as Actions from '../redux/actions';
import { Additional_doc } from '../types/reimbursements';
import caseService from '../services/case.service';

function AddInfo(props: any) {
	const INFO_TYPE = [
		'Supervisor Approval Email',
		'Department Head Approval Email',
		'Grade',
		'Presentation',
		'Other',
	];

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
	const [type, setType] = useState('Supervisor Approval Email');
	const [desc, setDesc] = useState('');

	useEffect(() => {
		const select = allCases.find((c) => c.created === id);
		if (select) dispatch(Actions.changeCase(select));
	}, [allCases, dispatch, id]);

	const handleFormInput = (e: SyntheticEvent) => {
		if ((e.target as HTMLInputElement).name === 'type') {
			setType((e.target as HTMLInputElement).value);
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
			const newInfo = new Additional_doc(
				new Date().toISOString(),
				`${user.fname} ${user.lname}`,
				type,
				desc
			);
			const updatedCase = { ...selected_case };
			if (newInfo.type === 'Supervisor Approval Email') {
				updatedCase.super_approval = `AUTO APPROVED ${new Date().toISOString()}`;
				updatedCase.status = 'In Dept Head Review';
			}
			if (newInfo.type === 'Department Head Approval Email') {
				if (user.supervisor === user.dept_head) {
					updatedCase.super_approval = `AUTO APPROVED ${new Date().toISOString()}`;
				}
				updatedCase.super_approval = `AUTO APPROVED ${new Date().toISOString()}`;
				updatedCase.status = 'In BenCo Review';
			}
			if (Array.isArray(updatedCase.additional_info)) {
				updatedCase.additional_info.push(newInfo);
			} else {
				updatedCase.additional_info = [newInfo];
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
			{error.error !== '' && <p className="error">{error.error}</p>}
			<h2>Add Additional Information</h2>
			<form onSubmit={handleSubmit}>
				{type === 'Department Head Approval Email' && (
					<p>
						If your direct supervisor isn't the Department Head: Obtain
						supervisor approval FIRST before submitting. Not doing so may
						invalidate your case.
					</p>
				)}
				<label htmlFor="type">Type:</label>
				<select id="type" name="type" onChange={handleFormInput}>
					{INFO_TYPE.map((type, index) => {
						if (index === 0) {
							return (
								<option key={'type' + index} defaultValue={type}>
									{type}
								</option>
							);
						} else {
							return (
								<option key={'type' + index} value={type}>
									{type}
								</option>
							);
						}
					})}
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

export default AddInfo;
