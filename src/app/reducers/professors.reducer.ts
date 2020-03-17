import { IProfessor } from './../I-entities';
import { Action, createReducer, on } from '@ngrx/store';
import { loadProfessorsSuccess, addProfessorSuccess, deleteProfessorSuccess } from '../actions/professor.actions';
import { SubjectsState } from './subjects.reducer';


export const professorsFeatureKey = 'professors';

export interface ProfessorsState {
  entities: {
      [id: string]: IProfessor;
  }
  subjects: SubjectsState;
  ids: string[];
  loading: boolean;
  loaded: boolean;
}

const initialState: ProfessorsState = {
  entities: {},
  ids: [],
  subjects: {} as SubjectsState,
  loading: false,
  loaded: false
}

const reducer = createReducer(
  initialState,
  on(loadProfessorsSuccess, (state, { professors }) => ({
      ...state,
      loaded: true,
      loading: false,
      entities: {
          ...state.entities, ...patchProfessors(professors)
      },
      ids: professors.map((professor) => professor.id)
  })),
  on(addProfessorSuccess, (state, { professor }) => ({
    ...state,
    ids: [...state.ids, professor.id],
    entities: {
      ...state.entities, ...addProfessor(professor)
    }
  })),
  on(deleteProfessorSuccess, (state, { professorId }) => ({
    ...state,
    ids: state.ids.filter(id => id !== professorId),
    entities: {
      ...deleteProfessor(state.entities, professorId)
    }
  })));

const patchProfessors = (proffesors: IProfessor[]) =>
  proffesors.reduce((acc, professor: IProfessor) => ({
      acc,
      [professor.id]: { ...professor }
  }), {});

  const addProfessor = (newProfessor: IProfessor) => ({
    [newProfessor.id]: { ...newProfessor }
  });

  const deleteProfessor = (professors: {
    [id: string]: IProfessor
  }, delProfessorId: string) => {
    return fromEntries(Object.entries(professors).filter(([key]) => key !== delProfessorId));
  };
  
  const fromEntries = (array: [string, IProfessor][]) => array.reduce((acc, [id, value]) => ({
    ...acc,
    [id]: value
  }), {});
  

export function professorsReducer(state: ProfessorsState | undefined, action: Action): ProfessorsState {
  return reducer(state, action);
}