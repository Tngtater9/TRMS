import React, { SyntheticEvent } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { UserState } from '../redux/reducer';
import * as Actions from '../redux/actions';
import { BENCO_HEAD_VIEWS, VIEWS } from './CONSTANTS';

function DashNav() {
	const history = useHistory();
	const dispatch = useDispatch();
	const userSelector = (state: UserState) => state.user;
	const user = useSelector(userSelector);
	return (
		<nav>
			<p>You have ${user.avail_funds.toFixed(2)} available</p>
			<button
				onClick={() => {
					history.push('/addCase');
				}}
			>
				Add Case
			</button>
			<label htmlFor="view">Case Filter</label>
			<select
				id="view"
				name="view"
				onChange={(e: SyntheticEvent) =>
					dispatch(Actions.changeView((e.target as HTMLInputElement).value))
				}
			>
				{user.title === 'BenCo Head'
					? BENCO_HEAD_VIEWS.map((view, index) => {
							if (index === 0) {
								return (
									<option key={'view' + index} defaultValue={view}>
										{view}
									</option>
								);
							} else {
								return (
									<option key={'view' + index} value={view}>
										{view}
									</option>
								);
							}
					  })
					: VIEWS.map((view, index) => {
							if (index === 0) {
								return (
									<option key={'view' + index} defaultValue={view}>
										{view}
									</option>
								);
							} else {
								return (
									<option key={'view' + index} value={view}>
										{view}
									</option>
								);
							}
					  })}
			</select>
		</nav>
	);
}

export default DashNav;
