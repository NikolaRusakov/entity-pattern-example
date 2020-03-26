import {Component, ElementRef, ViewChild} from '@angular/core';
import {Store, select} from '@ngrx/store';
import {AppState} from './reducers';
import {FormBuilder, Validators, FormControl} from '@angular/forms';
import {v4 as uuidv4} from 'uuid';
import {addSubjects} from './actions/subjects.actions';
import {addProfessorSuccess, addSelectedProfessor, deleteProfessorSuccess, unselectProfessor} from './actions/professor.actions';
import {$selectSubjects} from './selectors/subjects.selector';
import {BehaviorSubject, Observable} from 'rxjs';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatAutocomplete, MatAutocompleteSelectedEvent, MatChipInputEvent} from '@angular/material';
import {map, startWith, tap, withLatestFrom} from 'rxjs/operators';
import {$selectProfessors, $professorsSubjects, $clientSelectedProfessors, $filteredProfessors} from './selectors/professor.selector';
import {IProfessor} from './I-entities';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  titles = [
    {value: 'BA', viewValue: 'Bachelor of Arts'},
    {value: 'BAcc', viewValue: 'Bachelor of Accountancy'},
    {value: 'BAcy', viewValue: 'Bachelor of Science And Arts'},
    {value: 'BCA', viewValue: 'Bachelor of Computer Application'},
    {value: 'MBA', viewValue: 'Master of Business Administration'},
    {value: 'PhD', viewValue: 'Doctor of Philosophy'}
  ];

  subjectForm = this.fb.group({
    name: ['', Validators.required],
    id: [''],
  });

  professorForm = this.fb.group({
    id: [''],
    name: ['John Doe'],
    phoneNumber: ['+420420420420'],
    email: ['john.doe@mit.us'],
    address: ['Orange Country 42'],
    title: [null],
    subjects: []
  });

  readonly subjects$ = this.store.pipe(select($selectSubjects));


  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  professorsCtrl = new FormControl();

  selectedProfessors$ = this.store.pipe(select($clientSelectedProfessors));
  filteredProfessors$: Observable<IProfessor[]> = this.store.pipe(select($filteredProfessors));

  allProfessors$ = this.store.pipe(select($selectProfessors));
  professorsSubjects$ = this.store.pipe(select($professorsSubjects));

  @ViewChild('professorsInput', {static: false}) professorsInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', {static: false}) matAutocomplete: MatAutocomplete;

  constructor(private readonly store: Store<AppState>,
              private readonly fb: FormBuilder) {
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;

    // Reset the input value
    if (input) {
      input.value = '';
    }
    this.professorsCtrl.setValue(null);
  }

  remove({id}: IProfessor): void {
    this.store.dispatch(unselectProfessor({id}));
  }

  selected(event: MatAutocompleteSelectedEvent, filteredProfessors: IProfessor[]): void {
    this.professorsInput.nativeElement.value = '';
    this.professorsCtrl.setValue(null);
    const professorId = (event.option.value as IProfessor).id;
    const isFiltered = filteredProfessors && filteredProfessors.some(({id}) => id !== professorId) || true;
    if (isFiltered) {

      this.store.dispatch(addSelectedProfessor({id: professorId}));
    }

  }

  displayFn(professor: IProfessor): string {
    return professor && professor.name ? professor.name : '';
  }

  subjectSubmit(): void {
    this.subjectForm.patchValue({id: uuidv4()});
    this.store.dispatch(addSubjects({subjects: [this.subjectForm.value]}));
  }

  professorSubmit(): void {
    this.professorForm.patchValue({id: uuidv4()});
    this.store.dispatch(addProfessorSuccess({professor: this.professorForm.value}));
  }
}
