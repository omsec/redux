import { Component, OnInit, OnDestroy } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { State, getCurrentRouteState } from '../reducers/index'; // Store & Reducer (trennen!)

@Component({
  selector: 'app-course-show',
  templateUrl: './course-show.component.html',
  styleUrls: ['./course-show.component.css']
})
export class CourseShowComponent implements OnInit, OnDestroy {
  courseId: number;

  private subscriptions: { [key: string]: any } = {};

  constructor(private store: Store<State>) { }

  ngOnInit(): void {
    this.subscriptions.routerSelector = this.store
      .pipe(select(getCurrentRouteState))
      .subscribe((route: any) => {
        const id = route.params.id;
        this.courseId = id;
        // optional: etwas aufrufen, read/find..
      });
  }

  ngOnDestroy(): void {
    this.subscriptions.routerSelector.unsubscribe();
  }

}
