import { IStudent } from './../I-entities';
import { createAction, props } from '@ngrx/store';

export const loadStudents = createAction(
  '[Students] Load Students'
);

export const loadStudentsSuccess = createAction(
  '[Students] Load Students Success',
  props<{ students: IStudent[] }>()
);

export const addStudentsSuccess = createAction(
  '[Students] Load Students Success',
  props<{ students: IStudent[] }>()
);

export const loadStudentsFailure = createAction(
  '[Students] Load Students Failure',
  props<{ error: any }>()
);
