import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Reimburstment } from '../types/reimburstments';
import * as Actions from '../redux/actions';
import './Case.css';
import moment from 'moment';
import { UserState } from '../redux/reducer';

interface ReimburstmentProps {
	data: Reimburstment;
}

function CaseListItem(props: ReimburstmentProps) {
	const history = useHistory();
	const dispatch = useDispatch();
	const userSelector = (state: UserState) => state.user;
	const user = useSelector(userSelector);

	return (
		<section className="case-item">
			<p>{props.data.fname + ' ' + props.data.lname}</p>
			<p>{moment(props.data.event_date).format('LL')}</p>
			<p>{props.data.status}</p>
			<p>{props.data.event_type}</p>
			<p>
				{props.data.isUrgent && 'Urgent! '}
				{((!props.data.grade_format.approval_date &&
					user.title.includes('BenCo') &&
					props.data.status === 'Pending' &&
					new Date(props.data.event_date) < new Date()) ||
					(!props.data.grade_format.approval_date &&
						user.title.includes('Supervisor') &&
						!props.data.title.includes('Supervisor') &&
						props.data.grade_format.type === 'Presentation' &&
						props.data.status === 'Pending' &&
						new Date(props.data.event_date) < new Date()) ||
					(!props.data.grade_format.approval_date &&
						user.title.includes('Head') &&
						props.data.title.includes('Supervisor') &&
						props.data.grade_format.type === 'Presentation' &&
						props.data.status === 'Pending' &&
						new Date(props.data.event_date) < new Date())) &&
					'Needs Grade! '}
				{props.data.grade_format.approval_date &&
					user.title.includes('BenCo') &&
					props.data.status === 'Pending' &&
					'Ready to Award'}
			</p>
			<button
				onClick={() => {
					history.push(`/caseDetails/${props.data.created}`);
					dispatch(Actions.changeCase(props.data));
					dispatch(Actions.changeView('Urgent'));
				}}
			>
				View
			</button>
		</section>
	);
}

export default CaseListItem;
