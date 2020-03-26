import {AppState} from '../reducers';
import {subjectsFeatureKey} from '../reducers/subjects.reducer';
import {createSelector} from '@ngrx/store';
import {ISubject} from '../I-entities';

export const $selectSubjectFeature = (state: AppState) => state[subjectsFeatureKey];

export const $selectSubjects = createSelector(
  $selectSubjectFeature,
  ({entities}): ISubject[] => Object.values(entities));
