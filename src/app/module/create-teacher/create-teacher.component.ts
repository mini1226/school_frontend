import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {TeacherService} from "../../core/services/teacher/teacher.service";
import {SubjectService} from "../../core/services/subject/subject.service";
import {Router} from "@angular/router";
import {NgxSpinnerService} from "ngx-spinner";
import {AlertService} from "ngx-alerts";

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
              private router: Router,
              private spinner: NgxSpinnerService,
              private alertService: AlertService) {
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
    await this.spinner.show();
    await this.loadAllSubjects();
    await this.spinner.hide();
  }


  async loadAllSubjects(): Promise<boolean> {
    return new Promise(async resolve => {
      await this.spinner.show();
      this.subjectService.getSubjects().subscribe({
        next:(res)=>{
          this.subjects = res.subjects;
          console.log(this.subjects);
          resolve(true);
          this.spinner.hide();
        },
        error:() => {
          resolve(false);
          this.spinner.hide();
        }
      });
    });
  }



  async addTeacher( ): Promise<boolean> {
    return new Promise(async resolve => {
      await this.spinner.show();
      if (this.teacherForm.valid){
        this.teacherService.addTeacher(this.teacherForm.value)
          .subscribe((res: any) => {
            console.log(res);
            this.spinner.hide();
            this.alertService.success('Teacher Created successfully!');
            this.teacherForm.reset();
            resolve(true);
          }, (error: any) => {
            console.log(error.error);
            this.alertService.success('Teacher Create Failed!');
            this.spinner.hide();
            resolve(false);
          });
      }
    });
  }



}
