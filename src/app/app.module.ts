import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { AppEffects } from './app.effects';
import { CourseListComponent } from './course-list/course-list.component';
import { CourseEffects } from './effects/course.effects';
import { CourseShowComponent } from './course-show/course-show.component';
import { StoreRouterConnectingModule } from '@ngrx/router-store';

import { CustomSerializer} from './reducers/custom-serializer';

@NgModule({
  declarations: [
    AppComponent,
    CourseListComponent,
    CourseShowComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true
      }
    }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    EffectsModule.forRoot([AppEffects]),
    EffectsModule.forFeature([CourseEffects]),
    // eigener Serializer erstellt, damit nur die benötigten Daten ausgelesen werden,
    // und nicht der ganze State
    StoreRouterConnectingModule.forRoot({
      serializer: CustomSerializer, // ToDo: anderer Name?
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
