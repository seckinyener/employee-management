import { BehaviorSubject } from 'rxjs';
import { VIEW_MODE_TABLE } from '../utils/constants';

const initialState = {
    viewMode: VIEW_MODE_TABLE,
    selectedLang: 'en'
}

const sessionSubject = new BehaviorSubject(initialState);

export const session$ = sessionSubject.asObservable();

export const updateViewMode = (value) => {
    const toBeUpdatedState = {...sessionSubject.getValue()};
    toBeUpdatedState.viewMode = value;
    sessionSubject.next(toBeUpdatedState)
}

export const updateSelectedLanguage = (value) => {
    const toBeUpdatedState = {...sessionSubject.getValue()};
    toBeUpdatedState.selectedLang = value;
    sessionSubject.next(toBeUpdatedState)
}