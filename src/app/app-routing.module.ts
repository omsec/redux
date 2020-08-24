import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CourseShowComponent } from './course-show/course-show.component';


const routes: Routes = [
  {
    path: 'course/:id',
    component: CourseShowComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
