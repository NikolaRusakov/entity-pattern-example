import { Action, createReducer, on } from '@ngrx/store';
import { IStudent } from '../I-entities';
import { loadStudentsSuccess } from '../actions/students.actions';


export const studentsFeatureKey = 'students';

export interface StudentsState {
  entities: {
    [id: string]: IStudent;
  }
  ids: string[];
  loading: boolean;
  loaded: boolean;
}

const initialState: StudentsState = {
  entities: {},
  ids: [],
  loading: false,
  loaded: false
}

const reducer = createReducer(
  initialState,
  on(loadStudentsSuccess, (state, { students }) => ({
      ...state,
      loaded: true,
      loading: false,
      entities: {
          ...state.entities, ...patchStudents(students)
      },
      ids: students.map((student) => student.id)
  }))
);

const patchStudents = (students: IStudent[]) =>
students.reduce((acc, student: IStudent) => ({
      acc,
      [student.id]: { ...student }
  }), {});

export function studentsReducer(state: StudentsState | undefined, action: Action): StudentsState {
  return reducer(state, action);
}
