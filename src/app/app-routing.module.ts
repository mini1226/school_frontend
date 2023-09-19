import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AllTeachersComponent} from "./module/all-teachers/all-teachers.component";
import {AllSubjectsComponent} from "./module/all-subjects/all-subjects.component";
import {CreateTeacherComponent} from "./module/create-teacher/create-teacher.component";
import {CreateSubjectComponent} from "./module/create-subject/create-subject.component";
import {UpdateSubjectComponent} from "./module/update-subject/update-subject.component";
import {UpdateTeacherComponent} from "./module/update-teacher/update-teacher.component";
import {ViewTeacherComponent} from "./module/view-teacher/view-teacher.component";
import {ViewSubjectComponent} from "./module/view-subject/view-subject.component";

const routes: Routes = [
  {path:'', pathMatch:'full', component: AllTeachersComponent},
  {path: 'all-teachers', component: AllTeachersComponent},
  {path: 'all-subjects', component: AllSubjectsComponent},
  {path: 'create-teacher', component: CreateTeacherComponent},
  {path: 'create-subject', component: CreateSubjectComponent},
  {path: 'update-subject', component: UpdateSubjectComponent},
  {path: 'update-teacher', component: UpdateTeacherComponent},
  {path: 'view-teacher', component: ViewTeacherComponent},
  {path: 'view-subject', component: ViewSubjectComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
