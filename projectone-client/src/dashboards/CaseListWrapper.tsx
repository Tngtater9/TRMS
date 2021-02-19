import React from 'react';
import { useSelector } from 'react-redux';
import { CaseState } from '../redux/reducer';
import { Reimburstment } from '../types/reimburstments';
import CaseListItem from './CaseListItem';
import './Case.css';

function CaseListWrapper() {
	const casesSelector = (state: CaseState) => state.selected_cases;
	const cases = useSelector(casesSelector);

	return (
		<>
			<section className="case-wrapper case-item">
				<p>Name</p>
				<p>Event Date</p>
				<p>Status</p>
				<p>Event</p>
				<p>Important</p>
				<p></p>
			</section>
			{cases.length === 0 && <h2 className="no-case">No Cases</h2>}
			{cases.map((c: Reimburstment, index: number) => (
				<CaseListItem key={'CLI' + index} data={c} />
			))}
		</>
	);
}

export default CaseListWrapper;
