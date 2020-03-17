import { ISubject } from './../I-entities';
import { Action, createReducer, on } from '@ngrx/store';
import { loadSubjectsSuccess } from '../actions/subjects.actions';


export const subjectsFeatureKey = 'subjects';

export interface SubjectsState {
  entities: {
    [id: string]: ISubject;
  }
  ids: string[];
  loading: boolean;
  loaded: boolean;
}

export const initialState: SubjectsState = {
  entities: {},
  ids: [],
  loading: false,
  loaded: false
};

const subjectsReducer = createReducer(
  initialState,
  on(loadSubjectsSuccess, (state, { subjects }) => ({
      ...state,
      loaded: true,
      loading: false,
      entities: {
          ...state.entities, ...patchSubjects(subjects)
      },
      ids: subjects.map((subject) => subject.id)
  }))
);

const patchSubjects = (subjects: ISubject[]) =>
subjects.reduce((acc, subject: ISubject) => ({
      acc,
      [subject.id]: { ...subject }
  }), {});

export function reducer(state: SubjectsState | undefined, action: Action): SubjectsState {
  return subjectsReducer(state, action);
}
