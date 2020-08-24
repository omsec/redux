import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
} from '@ngrx/store';

// hinzugefügt
import * as fromRouter from '@ngrx/router-store';
import { routerReducer } from '@ngrx/router-store'; // nötig ??

import { environment } from '../../environments/environment';
import { Course } from '../_models/course';
import { CourseActions, CourseActionTypes } from '../actions/course.actions';
import { HttpErrorResponse } from '@angular/common/http';


// Teilobjekte vom Store (State) - manuell erstellt
export interface CourseState {
  courses: Course[];
  loading: boolean;
  error?: HttpErrorResponse; // ergänzt auf Basis Web-Demo
}

// dies ist der gesamte Store (manuell "zusammengesetzt" aus den Teilen)
export interface State {
  router: fromRouter.RouterReducerState<any>;
  course: CourseState;
}

// manuell ergänzt für Teil-States
export const initialCourseState: CourseState = {
  courses: null,
  loading: false,
  error: null
};

// Reducers können auch in eigener Datei implementiert werden

// Reducers müssen scheinbar manuell erstellt werden (und dann registriert unter const reducers)
export function courseReducer(state: CourseState = initialCourseState, action: CourseActions): CourseState {
  switch (action.type) {
    case CourseActionTypes.LoadCourses:
      return {
        ...state,
        loading: true,
        error: null
      };

    case CourseActionTypes.LoadCoursesSuccess:
      return {
        ...state,
        courses: action.payload.data,
        loading: false,
        error: null
      };

    // leider nicht im Buch - ergänzt auf Basis Web-Demo
    // https://medium.com/angular-in-depth/how-to-start-flying-with-angular-and-ngrx-b18e84d444aa
    case CourseActionTypes.LoadCoursesFailure:
      return {
        ...state,
        courses: null,
        loading: false,
        error: action.payload.error
      };

    default:
      return state;
  }
}

// Reducer registrieren
export const reducers: ActionReducerMap<State> = {
  router: routerReducer, // ergänzt
  course: courseReducer
};

// higher-order reducers geben andere reducers zurück
// damit kann bspw. logging gemacht werden
export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];

// Selectors ("Queries") können auch in eigener Datei implementiert werden (Komplexität)
// Selectors manuell erstellt (liefert ganzen Teil-State Course vom Store)

// export const selectCourse = (state: State) => state.course.courses; // einfachste Form

// besser: createFeatureSelector verwenden (Memoization)
// Step 1: Feature-State (Slice) (= Teil vom Store) auslesen
export const getCourseState = createFeatureSelector<CourseState>('course');

// Step 2: Fachliche Funktion, Slice interpretieren
export const getCoursesLoading = createSelector(
  getCourseState,
  courseState => courseState.loading
);

export const getAllCourses = createSelector(
  getCourseState,
  courseState => courseState.courses
);

// Step 3: Fehler Selektor
export const getCoursesError = createSelector(
  getCourseState,
  courseState => courseState.error
);


// Router Selectors ergänzt
export const getRouterState = (state: State) => state.router;

export const getCurrentRouteState = createSelector(
  getRouterState,
  (state: fromRouter.RouterReducerState) => state.state
);
