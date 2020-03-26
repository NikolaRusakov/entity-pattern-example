import {
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';
import {environment} from '../../environments/environment';
import * as fromProfessors from './professors.reducer';
import * as fromStudents from './students.reducer';
import * as fromSubjects from './subjects.reducer';
import {InjectionToken} from '@angular/core';


export interface AppState {
  [fromProfessors.professorsFeatureKey]: fromProfessors.ProfessorsState;
  [fromStudents.studentsFeatureKey]: fromStudents.StudentsState;
  [fromSubjects.subjectsFeatureKey]: fromSubjects.SubjectsState;
}

export const reducers: ActionReducerMap<AppState> = {
  [fromProfessors.professorsFeatureKey]: fromProfessors.professorsReducer,
  [fromStudents.studentsFeatureKey]: fromStudents.studentsReducer,
  [fromSubjects.subjectsFeatureKey]: fromSubjects.reducer,
};

export const REDUCERS_TOKEN = new InjectionToken<ActionReducerMap<AppState>>('App Reducers');
export const reducerProvider = {provide: REDUCERS_TOKEN, useValue: reducers};
