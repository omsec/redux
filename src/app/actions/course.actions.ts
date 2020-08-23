import { Action } from '@ngrx/store';
import { HttpErrorResponse} from '@angular/common/http'; // ergänzt

import { Course } from '../_models/course';

export enum CourseActionTypes {
  LoadCourses = '[Course] Load Courses',
  LoadCoursesSuccess = '[Course] Load Courses Success',
  LoadCoursesFailure = '[Course] Load Courses Failure',
}

export class LoadCourses implements Action {
  readonly type = CourseActionTypes.LoadCourses;
}

export class LoadCoursesSuccess implements Action {
  readonly type = CourseActionTypes.LoadCoursesSuccess;
  // payload manuell typisiert
  constructor(public payload: { data: Course[] }) { }
}

export class LoadCoursesFailure implements Action {
  readonly type = CourseActionTypes.LoadCoursesFailure;
  // payload manuell typisiert
  constructor(public payload: { error: HttpErrorResponse }) { }
}

export type CourseActions = LoadCourses | LoadCoursesSuccess | LoadCoursesFailure;

