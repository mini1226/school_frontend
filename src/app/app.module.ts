import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AllTeachersComponent } from './module/all-teachers/all-teachers.component';
import { AllSubjectsComponent } from './module/all-subjects/all-subjects.component';
import { CreateTeacherComponent } from './module/create-teacher/create-teacher.component';
import { CreateSubjectComponent } from './module/create-subject/create-subject.component';
import { NavBarComponent } from './shared/nav-bar/nav-bar.component';
import { SideBarComponent } from './shared/side-bar/side-bar.component';
import {HttpClientModule} from "@angular/common/http";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    AllTeachersComponent,
    AllSubjectsComponent,
    CreateTeacherComponent,
    CreateSubjectComponent,
    NavBarComponent,
    SideBarComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
