import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, map, catchError } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Course } from '../_models/course';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private http: HttpClient
  ) { }

  getAll(): Observable<Course[]> {
    return this.http.post<Course[]>(
      `${environment.apiUrl}/listCourses`, null)
      .pipe(
        retry(3),
        catchError(this.errorHandler)
      );
  }

  private errorHandler(error: HttpErrorResponse): Observable<any> {
    console.error('Fehler aufgetreten!');
    return throwError(error); // Fehler weitergeben
  }
}
