import React, { SyntheticEvent, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CaseState, UserState } from '../redux/reducer';
import * as Actions from '../redux/actions';
import { Grade_format, Reimburstment } from '../types/reimbursements';
import caseService from '../services/case.service';
import Header from '../Header/Header';
import moment from 'moment';

function AddCase() {
	const EVENT_TYPE = [
		'University Course',
		'Seminar',
		'Certification Prep',
		'Certification',
		'Technical Training',
		'Other',
	];

	const [error, setError] = useState({ error: '' });
	const history = useHistory();
	const dispatch = useDispatch();
	const inputSelector = (state: CaseState) => state.case_inputs;
	const input = useSelector(inputSelector);
	const userSelector = (state: UserState) => state.user;
	const user = useSelector(userSelector);

	const handleFormInput = (e: SyntheticEvent) => {
		let newInput = { ...input };

		switch ((e.target as HTMLInputElement).name) {
			case 'event_date':
				newInput.event_date = (e.target as HTMLInputElement).value;
				break;
			case 'event_time':
				newInput.event_time = (e.target as HTMLInputElement).value;
				break;
			case 'event_location':
				newInput.event_location = (e.target as HTMLInputElement).value;
				break;
			case 'event_description':
				newInput.event_description = (e.target as HTMLInputElement).value;
				break;
			case 'event_cost':
				newInput.event_cost = (e.target as HTMLInputElement).value.replace(
					/\D/,
					''
				);
				break;
			case 'event_type':
				newInput.event_type = (e.target as HTMLInputElement).value;
				break;
			case 'justification':
				newInput.justification = (e.target as HTMLInputElement).value;
				break;
			case 'missed_work':
				newInput.missed_work = (e.target as HTMLInputElement).value;
				break;
			case 'grade_type':
				newInput.grade_format.type = (e.target as HTMLInputElement).value;
				break;
			case 'grade_cutoff':
				newInput.grade_format.grade_cutoff = (e.target as HTMLInputElement).value;
				break;
		}
		dispatch(Actions.caseInputAction(newInput));
	};

	useEffect(() => {
		let newInput = { ...input };
		if (input.event_cost === '') {
			newInput.projected_amount = 0;
			dispatch(Actions.caseInputAction(newInput));
		} else if (input.event_cost) {
			switch (input.event_type) {
				case EVENT_TYPE[0]:
					newInput.projected_amount = (input.event_cost as number) * 0.8;
					dispatch(Actions.caseInputAction(newInput));
					break;
				case EVENT_TYPE[1]:
					newInput.projected_amount = (input.event_cost as number) * 0.6;
					dispatch(Actions.caseInputAction(newInput));
					break;

				case EVENT_TYPE[2]:
					newInput.projected_amount = (input.event_cost as number) * 0.75;
					dispatch(Actions.caseInputAction(newInput));
					break;

				case EVENT_TYPE[3]:
					newInput.projected_amount = input.event_cost as number;
					dispatch(Actions.caseInputAction(newInput));
					break;

				case EVENT_TYPE[4]:
					newInput.projected_amount = (input.event_cost as number) * 0.9;
					dispatch(Actions.caseInputAction(newInput));
					break;

				case EVENT_TYPE[5]:
					newInput.projected_amount = (input.event_cost as number) * 0.3;
					dispatch(Actions.caseInputAction(newInput));
					break;
				default:
					newInput.projected_amount = 0;
					dispatch(Actions.caseInputAction(newInput));
			}
		}
	}, [input.event_cost, input.event_type]);

	const handleCaseSubmit = (e: SyntheticEvent) => {
		e.preventDefault();

		setError({ error: '' });

		const TODAY = moment(new Date().toISOString());
		const ONE_WEEK = moment(TODAY).add(1, 'w');
		if (moment(input.event_date).isBetween(TODAY, ONE_WEEK)) {
			setError({ error: 'Cannot create case. Event is a week or less away.' });
		} else if (input.event_time === '') {
			setError({ error: 'Event Time required' });
		} else if (input.event_location === '') {
			setError({ error: 'Event Location required' });
		} else if (input.event_description === '') {
			setError({ error: 'Event Description required' });
		} else if (input.justification === '') {
			setError({ error: 'Justification required' });
		} else if (input.missed_work === '') {
			setError({ error: 'How much missed work required' });
		} else if (input.event_date === '') {
			setError({ error: 'Event Date required' });
		} else if (input.grade_format.type === '') {
			setError({ error: 'Grade Type required' });
		} else if (
			input.grade_format.type === 'Passing Grade' &&
			input.grade_format.grade_cutoff === ''
		) {
			setError({ error: 'Grade Cutoff required' });
		} else {
			let newCase;
			if (user.title.includes('Supervisor')) {
				newCase = new Reimburstment(
					user.username,
					user.fname,
					user.lname,
					user.title,
					user.dept,
					new Date().toISOString(),
					'In Dept Head Review',
					input.event_date,
					input.event_time,
					input.event_location,
					input.event_description,
					Number(input.event_cost),
					input.event_type,
					input.projected_amount,
					input.justification,
					input.missed_work,
					new Grade_format(
						input.grade_format.type,
						input.grade_format.grade_cutoff
					),
					false,
					false,
					0,
					`AUTO APPROVED ${new Date().toISOString()}`,
					'',
					'',
					[],
					'',
					'',
					[]
				);
			} else {
				newCase = new Reimburstment(
					user.username,
					user.fname,
					user.lname,
					user.title,
					user.dept,
					new Date().toISOString(),
					'In Supervisor Review',
					input.event_date,
					input.event_time,
					input.event_location,
					input.event_description,
					Number(input.event_cost),
					input.event_type,
					input.projected_amount,
					input.justification,
					input.missed_work,
					new Grade_format(
						input.grade_format.type,
						input.grade_format.grade_cutoff
					),
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
				);
			}

			caseService
				.addCase(newCase)
				.then(() => {
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
					history.push('/dashboard');
				})
				.catch((err) => {
					setError({ error: err.message });
				});
		}
	};
	return (
		<main>
			<Header />
			<h2>Add Reimbursement Case</h2>
			<form onSubmit={handleCaseSubmit}>
				{error.error !== '' && <p className="error">{error.error}</p>}
				<label htmlFor="event_date">Event Date</label>
				<br />

				<input
					required
					id="event_date"
					name="event_date"
					type="date"
					value={input.event_date}
					onChange={handleFormInput}
				/>
				<br />
				<br />
				<br />
				<label htmlFor="event_time">Event Time</label>
				<br />

				<input
					required
					id="event_time"
					name="event_time"
					type="time"
					value={input.event_time}
					onChange={handleFormInput}
				/>
				<br />
				<br />
				<br />
				<label htmlFor="event_location">Event Location</label>
				<br />

				<input
					required
					id="event_location"
					name="event_location"
					type="text"
					value={input.event_location}
					onChange={handleFormInput}
				/>
				<br />
				<br />
				<br />
				<label htmlFor="event_description">Event Description</label>
				<br />

				<input
					required
					id="event_description"
					name="event_description"
					type="text"
					value={input.event_description}
					onChange={handleFormInput}
				/>
				<br />
				<br />
				<br />
				<label htmlFor="event_cost">Event Cost</label>
				<br />

				<input
					required
					id="event_cost"
					name="event_cost"
					type="text"
					value={input.event_cost}
					onChange={handleFormInput}
				/>
				<br />
				<br />
				<br />
				<label htmlFor="event_type">Event Type</label>
				<br />

				<select
					id="event_type"
					name="event_type"
					value={input.event_type}
					onChange={handleFormInput}
				>
					{EVENT_TYPE.map((type, index) => {
						if (index === 0) {
							return (
								<option key={'ev_type' + index} defaultValue={type}>
									{type}
								</option>
							);
						} else {
							return (
								<option key={'ev_type' + index} value={type}>
									{type}
								</option>
							);
						}
					})}
				</select>
				<br />
				<br />
				<br />
				<label htmlFor="projected_amount">Projected Amount</label>
				<br />

				<input
					id="projected_amount"
					name="projected_amount"
					type="number"
					value={input.projected_amount.toFixed(2)}
					disabled
				/>
				<br />
				<br />
				<br />
				<label htmlFor="justification">Justification</label>
				<br />
				<textarea
					required
					id="justification"
					name="justification"
					onChange={handleFormInput}
				/>
				<br />
				<br />
				<br />
				<label htmlFor="missed_work">What work will you miss?</label>
				<br />
				<textarea
					required
					id="missed_work"
					name="missed_work"
					onChange={handleFormInput}
				/>
				<br />
				<br />
				<br />
				<label htmlFor="grade_type">Grade Type</label>
				<br />

				<select
					id="grade_type"
					name="grade_type"
					value={input.grade_format.type}
					onChange={handleFormInput}
				>
					<option defaultValue="Passing Grade">Passing Grade</option>
					<option value="Presentation">Presentation</option>
				</select>
				<br />
				<br />
				<br />
				{input.grade_format.type === 'Passing Grade' && (
					<>
						<label htmlFor="grade_cutoff">Passing Grade Cutoff</label>
						<br />
						<br />
						<input
							required
							id="grade_cutoff"
							name="grade_cutoff"
							type="text"
							value={input.grade_format.grade_cutoff}
							onChange={handleFormInput}
						/>
						<br />
						<br />
						<br />
					</>
				)}
				<button type="submit" onClick={handleCaseSubmit}>
					Submit
				</button>
			</form>
		</main>
	);
}

export default AddCase;
