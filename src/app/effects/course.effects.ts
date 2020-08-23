import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { CourseActions, CourseActionTypes, LoadCoursesSuccess, LoadCoursesFailure } from '../actions/course.actions';
import { CourseService } from '../_services/course.service';
import { map, switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';



@Injectable()
export class CourseEffects {

  // mnauell implementiert - decorat erst am schluss setzen (dead loops)
  @Effect()
  loadCourses$ = this.actions$.pipe(
    ofType(CourseActionTypes.LoadCourses), // gesuchte Actions filtern
    switchMap(() => // nur die letzte Anfrage bearbeiten wenn schon eine läuft (Beispiel, nicht default!)
      this.courseService.getAll().pipe(
        map(courses => new LoadCoursesSuccess( { data: courses })),
        catchError(error => of(new LoadCoursesFailure({ error })))
      )
    )
  );

  constructor(
    private actions$: Actions<CourseActions>, // manuell typisiert
    private courseService: CourseService // mnauell injected
  ) {}

}
