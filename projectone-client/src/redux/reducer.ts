import * as Actions from './actions';
import { Reimburstment, Grade_format } from '../types/reimburstments';
import { User, LoginCreds } from '../types/user';

export interface UserState {
	user: User;
	loginCreds: LoginCreds;
}

export interface CaseState {
	cases: Reimburstment[];
	selected_case: Reimburstment;
	case_inputs: Reimburstment;
	selected_cases: Reimburstment[];
}

export interface UIState {
	view: string;
}

export interface AppState extends UserState, CaseState, UIState {}

export const initialState: AppState = {
	user: new User(),
	loginCreds: new LoginCreds(),
	cases: [],
	selected_case: new Reimburstment(),
	case_inputs: new Reimburstment(
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
	),
	selected_cases: [],
	view: 'Urgent',
};

const reducer = (
	state: AppState = initialState,
	action: Actions.AppAction
): AppState => {
	console.log(action);
	const newState = { ...state };

	switch (action.type) {
		case Actions.UserActions.GetUser:
			newState.user = action.payload as User;
			newState.loginCreds = new LoginCreds();
			return newState;
		case Actions.UserActions.LoginChange:
			newState.loginCreds = action.payload as LoginCreds;
			return newState;
		case Actions.CaseActions.GetCases:
			newState.cases = action.payload as Reimburstment[];
			return newState;
		case Actions.CaseActions.ChangeCase:
			newState.selected_case = action.payload as Reimburstment;
			return newState;
		case Actions.CaseActions.ChangeCaseInputs:
			newState.case_inputs = action.payload as Reimburstment;
			return newState;
		case Actions.CaseActions.ChangeSelectedCases:
			newState.selected_cases = action.payload as Reimburstment[];
			return newState;
		case Actions.UIActions.ChangeView:
			newState.view = action.payload as string;
			return newState;
		default:
			return state;
	}
};

export default reducer;
