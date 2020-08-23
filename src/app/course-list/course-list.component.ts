import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store'; // select ergänzt

import { State, getCoursesError } from '../reducers'; // Root State (nicht Modul, falls vorhanden)
import { LoadCourses } from '../actions/course.actions';
import { getCoursesLoading, getAllCourses } from '../reducers/index'; // enthält Reducers und Selectors (besser eigene Files)
import { Observable } from 'rxjs';
import { Course } from '../_models/course';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {
  // Jede Information ist ein Observable in der Komponente
  courses$: Observable<Course[]>;
  loading$: Observable<boolean>;
  error$: Observable<HttpErrorResponse>;

  constructor(private store: Store<State>) { }

  ngOnInit() {
    this.courses$ = this.store.pipe(select(getAllCourses));
    this.loading$ = this.store.pipe(select(getCoursesLoading));
    this.error$ = this.store.pipe(select(getCoursesError));

    this.store.dispatch(new LoadCourses());
  }

}
