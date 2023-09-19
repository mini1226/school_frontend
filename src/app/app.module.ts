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
import { ViewTeacherComponent } from './module/view-teacher/view-teacher.component';
import { UpdateTeacherComponent } from './module/update-teacher/update-teacher.component';
import { UpdateSubjectComponent } from './module/update-subject/update-subject.component';
import { ViewSubjectComponent } from './module/view-subject/view-subject.component';

@NgModule({
  declarations: [
    AppComponent,
    AllTeachersComponent,
    AllSubjectsComponent,
    CreateTeacherComponent,
    CreateSubjectComponent,
    NavBarComponent,
    SideBarComponent,
    ViewTeacherComponent,
    UpdateTeacherComponent,
    UpdateSubjectComponent,
    ViewSubjectComponent,

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
