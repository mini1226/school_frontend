import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {TeacherService} from "../../core/services/teacher/teacher.service";
import {SubjectService} from "../../core/services/subject/subject.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-teacher',
  templateUrl: './create-teacher.component.html',
  styleUrls: ['./create-teacher.component.scss']
})
export class CreateTeacherComponent {


  subjects: any[] = [];


  teacherForm = new FormGroup({
    FirstName: new FormControl('', [Validators.required]),
    LastName: new FormControl('', [Validators.required]),
    Email: new FormControl('', [Validators.required,Validators.email]),
    Phone: new FormControl('', [Validators.required]),
    SubjectID: new FormControl('', [Validators.required])
  });


  constructor(private subjectService: SubjectService,
              private teacherService: TeacherService,
              private router: Router) {
  }


  get FirstName(): any {
    return this.teacherForm.get('FirstName');
  }

  get LastName(): any {
    return this.teacherForm.get('LastName');
  }

  get Email(): any {
    return this.teacherForm.get('Email');
  }

  get Phone(): any {
    return this.teacherForm.get('Phone');
  }

  get SubjectID(): any {
    return this.teacherForm.get('SubjectID');
  }



  async ngOnInit(): Promise<any> {
    await this.loadAllSubjects();
  }


  async loadAllSubjects(): Promise<boolean> {
    return new Promise(async resolve => {
      this.subjectService.getSubjects().subscribe({
        next:(res)=>{
          this.subjects = res.subjects;
          console.log(this.subjects);
          resolve(true);
        },
        error:() => {
          resolve(false);
        }
      });
    });
  }



  addTeacher( ): Promise<boolean> {
    return new Promise(resolve => {
      if (this.teacherForm.valid){
        this.teacherService.addTeacher(this.teacherForm.value)
          .subscribe((res: any) => {
            console.log(res);
            this.teacherForm.reset();
            resolve(true);
          }, (error: any) => {
            console.log(error.error);
            resolve(false);
          });
      }
    });
  }



}
