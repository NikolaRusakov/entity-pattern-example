import { ISubject } from './../I-entities';
import { createAction, props } from '@ngrx/store';

export const loadSubjects = createAction(
  '[Subjects] Load Subjects'
);

export const loadSubjectsSuccess = createAction(
  '[Subjects] Load Subjects Success',
  props<{ subjects: ISubject[] }>()
);

export const loadSubjectsFailure = createAction(
  '[Subjects] Load Subjects Failure',
  props<{ error: any }>()
);
