import { BehaviorSubject } from 'rxjs';
import { VIEW_MODE_TABLE } from '../utils/constants';

const initialState = {
    viewMode: VIEW_MODE_TABLE
}

const sessionSubject = new BehaviorSubject(initialState);

export const session$ = sessionSubject.asObservable();

export const updateViewMode = (value) => {
    const toBeUpdatedState = {...sessionSubject.getValue()};
    toBeUpdatedState.viewMode = value;
    sessionSubject.next(toBeUpdatedState)
}