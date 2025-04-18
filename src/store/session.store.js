import { BehaviorSubject } from 'rxjs';
import { VIEW_MODE_TABLE } from '../utils/constants';

const initialState = {
    viewMode: VIEW_MODE_TABLE,
    selectedLang: 'en'
}

const sessionSubject = new BehaviorSubject(initialState);

const session$ = sessionSubject.asObservable();

const updateViewMode = (value) => {
    const toBeUpdatedState = {...sessionSubject.getValue()};
    toBeUpdatedState.viewMode = value;
    sessionSubject.next(toBeUpdatedState)
}

const updateSelectedLanguage = (value) => {
    const toBeUpdatedState = {...sessionSubject.getValue()};
    toBeUpdatedState.selectedLang = value;
    sessionSubject.next(toBeUpdatedState)
}

export default {
    session$,
    updateViewMode,
    updateSelectedLanguage
}

