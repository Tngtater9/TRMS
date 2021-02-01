import React, { SyntheticEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { CaseState, UserState } from '../redux/reducer';
import * as Actions from '../redux/actions';
import caseService from '../services/case.service';
import Header from '../Header/Header';

function Grade(props: any) {
	const history = useHistory();
	const dispatch = useDispatch();
	const userSelector = (state: UserState) => state.user;
	const user = useSelector(userSelector);
	const caseSelector = (state: CaseState) => state.selected_case;
	const selectedCase = useSelector(caseSelector);
	const casesSelector = (state: CaseState) => state.cases;
	const allCases = useSelector(casesSelector);
	const id = props.match.params.id;

	const [error, setError] = useState({ error: '' });
	const [gradeInput, setGradeInput] = useState({
		...selectedCase.grade_format,
	});

	useEffect(() => {
		const select = allCases.find((c) => c.created === id);
		if (select) dispatch(Actions.changeCase(select));
	}, [allCases, dispatch, id]);

	const handleSubmit = (e: SyntheticEvent) => {
		e.preventDefault();

		setError({ error: '' });

		if (gradeInput.grade === '') {
			setError({ error: 'Grade required' });
		} else {
			const gradeObj = { ...gradeInput };
			const updatedCase = { ...selectedCase };

			gradeObj.approver = `${user.fname} ${user.lname}`;
			gradeObj.approval_date = new Date().toISOString();
			updatedCase.grade_format = gradeObj;

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
			<h2>Grading Form</h2>
			<p>Grade Type: {gradeInput.type}</p>
			{gradeInput.grade_cutoff && (
				<p>Grade Cutoff: {gradeInput.grade_cutoff}</p>
			)}
			<form onClick={handleSubmit}>
				<label htmlFor="grade">Grade:</label>
				<input
					required
					id="grade"
					name="grade"
					value={gradeInput.grade}
					onChange={(e) =>
						setGradeInput({ ...gradeInput, grade: e.target.value })
					}
				/>
				<button type="submit" onClick={handleSubmit}>
					Submit
				</button>
			</form>
		</main>
	);
}

export default Grade;
