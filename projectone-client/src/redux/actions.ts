import { Reimburstment } from '../types/reimburstments';
import { User, LoginCreds } from '../types/user';

export enum CaseActions {
	GetCases = 'GET_CASES',
	ChangeCase = 'CHANGE_CASE',
	ChangeCaseInputs = 'CHANGE_CASE_INPUTS',
	ChangeSelectedCases = 'CHANGE_SELECTED_CASES',
}

export enum UserActions {
	GetUser = 'GET_USER',
	LoginChange = 'CHANGE_LOGIN',
}

export enum UIActions {
	ChangeView = 'CHANGE_VIEW',
}

export interface AppAction {
	type: string;
	payload: any;
}

export interface UserAction extends AppAction {
	type: UserActions;
	payload: User | LoginCreds;
}

export interface CaseAction extends AppAction {
	type: CaseActions;
	payload: Reimburstment | Reimburstment[];
}

export interface UIAction extends AppAction {
	type: UIActions;
	payload: string;
}

export function getUser(user: User): UserAction {
	const action: UserAction = {
		type: UserActions.GetUser,
		payload: user,
	};
	return action;
}

export function loginAction(login: LoginCreds): UserAction {
	const action: UserAction = {
		type: UserActions.LoginChange,
		payload: login,
	};
	return action;
}

export function getCases(cases: Reimburstment[]): CaseAction {
	const action: CaseAction = {
		type: CaseActions.GetCases,
		payload: cases,
	};
	return action;
}

export function changeCase(newCase: Reimburstment): CaseAction {
	const action: CaseAction = {
		type: CaseActions.ChangeCase,
		payload: newCase,
	};
	return action;
}

export function caseInputAction(newCase: Reimburstment): CaseAction {
	const action: CaseAction = {
		type: CaseActions.ChangeCaseInputs,
		payload: newCase,
	};
	return action;
}

export function changeSelectedCases(cases: Reimburstment[]): CaseAction {
	const action: CaseAction = {
		type: CaseActions.ChangeSelectedCases,
		payload: cases,
	};
	return action;
}

export function changeView(view: string): UIAction {
	const action: UIAction = {
		type: UIActions.ChangeView,
		payload: view,
	};
	return action;
}
