import {createSelector} from '@ngrx/store';
import {AppState} from '../reducers';
import {subjectsFeatureKey, SubjectsState} from '../reducers/subjects.reducer';
import {professorsFeatureKey} from '../reducers/professors.reducer';
import {IProfessor, ISubject} from '../I-entities';
import {studentsFeatureKey} from '../reducers/students.reducer';


export const $selectSubjectFeature = (state: AppState): SubjectsState => state[subjectsFeatureKey];
export const $selectProfessorFeature = (state: AppState) => state[professorsFeatureKey];
export const $selectStudentsFeature = (state: AppState) => state[studentsFeatureKey];

const $selectSubjectEntities = createSelector($selectSubjectFeature, ({entities}) => entities);
const $selectStudentEntities = createSelector($selectStudentsFeature, ({entities}) => entities);
export const $selectProfessorEntities = createSelector($selectProfessorFeature, ({entities}) => entities);

export const $selectProfessors = createSelector(
  $selectProfessorEntities,
  (entities): IProfessor[] => Object.values(entities) || []);

export const $selectedProfessors = createSelector(
  $selectProfessorFeature,
  ({selectedProfessors}): string[] => selectedProfessors);

export const $clientSelectedProfessors = createSelector(
  $selectProfessorEntities,
  $selectedProfessors,
  (entities, professors): IProfessor[] =>
    Object.values(entities).filter((key) =>
      professors.includes(key.id)
    )
);

export const $filteredProfessors = createSelector(
  $selectedProfessors,
  $selectProfessorEntities,
  (selected, entities) =>
    Object.values(entities).filter(entity => !(selected.includes(entity.id)))
);

export const $selectedProfessorsById = createSelector(
  $selectedProfessors,
  $selectProfessorEntities, (professors, entities):
  IProfessor[] => professors.map(id => entities[id])
);

export const $professorsSubjects = createSelector(
  $clientSelectedProfessors,
  $selectSubjectEntities,
  $selectStudentEntities,
  (professors, subjects, students):
  { professor: IProfessor, subjects: ISubject[] }[] =>
    professors.reduce(
      (acc, professor, num) => [...acc, {
        professor,
        subjects: professor.subjects && professor.subjects.map(subject => subjects[subject]) || [],
        // students: professor.students.map(student => students[student])
      }], [])
);
