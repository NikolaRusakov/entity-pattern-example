import { IProfessor } from './../I-entities';
import { createAction, props } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';

export const loadProfessors = createAction(
  '[Professor] Load Professors'
);

export const loadProfessorsSuccess = createAction(
  '[Professor] Load Professors Success',
  props<{ professors: IProfessor[] }>()
);

export const loadProfessorsFailure = createAction(
  '[Professor] Load Professors Failure',
  props<{ error: any }>()
);

export const addMember = createAction(
  '[Professors] Add Professors',
  props<{ member: IProfessor }>()
)

export const addProfessorSuccess = createAction(
  '[Professors] Add Professors Success',
  props<{ professor: IProfessor }>()
);

export const addProfessorFailure = createAction(
  '[Professors] Add Professors Failure',
  props<{ error: HttpErrorResponse }>()
);

export const deleteProfessor = createAction(
  '[Professors] Delete Professors',
  props<{ professorId: string }>()
)

export const deleteProfessorSuccess = createAction(
  '[Professors] Delete Professors Success',
  props<{ professorId: string }>(),
)

export const deleteProfessorFailure = createAction(
  '[Professors] Delete Professors Failure',
  props<{ error: HttpErrorResponse }>()
)