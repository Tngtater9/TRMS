import React, { useEffect } from 'react';
import {
	Switch,
	Redirect,
	Route,
	useHistory,
	BrowserRouter,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import userService from './services/user.service';
import * as Actions from './redux/actions';
import './App.css';
import LoginComponent from './user/Login';
import Register from './user/Register';
import Dashboard from './dashboards/Dashboard';
import { UserState } from './redux/reducer';
import AddCase from './CasePages/AddCase';
import CaseDetails from './CasePages/CaseDetails';
import ReqInfoForm from './CasePages/ReqInfoForm';
import AddInfo from './CasePages/AddInfo';
import Grade from './CasePages/Grade';
import Award from './CasePages/Award';
import DenyCase from './CasePages/DenyCase';

function App() {
	const history = useHistory();
	const dispatch = useDispatch();
	const userSelector = (state: UserState) => state.user;
	const user = useSelector(userSelector);
	useEffect(() => {
		userService
			.refresh()
			.then((user) => {
				console.log(user);
				dispatch(Actions.getUser(user));
			})
			.catch((error) => console.log(error));
	}, [dispatch, history]);

	return (
		<>
			<BrowserRouter>
				<Switch>
					<Route
						exact
						path="/"
						render={() =>
							user.username !== '' ? (
								<Redirect to="/dashboard" />
							) : (
								<LoginComponent />
							)
						}
					/>
					<Route
						path="/register"
						render={() =>
							user.username !== '' ? <Redirect to="/dashboard" /> : <Register />
						}
					/>
					<Route path="/dashboard" component={Dashboard} />
					<Route path="/addCase" component={AddCase} />
					<Route path="/caseDetails/:id" component={CaseDetails} />
					<Route path="/reqInfo/:id" component={ReqInfoForm} />
					<Route path="/addInfo/:id" component={AddInfo} />
					<Route path="/grade/:id" component={Grade} />
					<Route path="/award/:id" component={Award} />
					<Route path="/deny/:id" component={DenyCase} />
				</Switch>
			</BrowserRouter>
		</>
	);
}

export default App;
