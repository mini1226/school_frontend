import {Component, OnInit} from '@angular/core';
import {TeacherService} from "../../core/services/teacher/teacher.service";
import {ActivatedRoute} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {SubjectService} from "../../core/services/subject/subject.service";
import {NgxSpinnerService} from "ngx-spinner";
import {AlertService} from "ngx-alerts";

@Component({
  selector: 'app-update-teacher',
  templateUrl: './update-teacher.component.html',
  styleUrls: ['./update-teacher.component.scss']
})
export class UpdateTeacherComponent implements OnInit{

  teacher_id: any;

  TeacherID:any;
  FirstNamee: any;
  LastNamee: any;
  Emaill: any;
  Phonee: any;
  SubjectIDD: any;
  SubjectName: any;


  subjects: any[] = [];


  teacherForm = new FormGroup({
    FirstName: new FormControl('', [Validators.required]),
    LastName: new FormControl('', [Validators.required]),
    Email: new FormControl('', [Validators.required,Validators.email]),
    Phone: new FormControl('', [Validators.required]),
    SubjectID: new FormControl('', [Validators.required])
  });



  constructor(private teacherService: TeacherService,
              private route: ActivatedRoute,
              private subjectService: SubjectService,
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
    // Extract the ID from the route parameters
    this.route.queryParams.subscribe(params => {
      this.teacher_id = params['id'];
      if (this.teacher_id) {
        this.loadTeacherById(this.teacher_id);
        this.loadAllSubjects();
      }
    });
    await this.spinner.hide();
  }



  async loadTeacherById(id:any): Promise<boolean> {
    return new Promise(async resolve => {
      await this.spinner.show();
      this.teacherService.getTeacherById(id).subscribe({
        next:(res)=>{
          this.TeacherID = res.teacher.TeacherID;
          this.FirstNamee = res.teacher.FirstName;
          this.LastNamee = res.teacher.LastName;
          this.Emaill = res.teacher.Email;
          this.Phonee = res.teacher.Phone;
          this.SubjectIDD = res.teacher.SubjectID;
          this.SubjectName = res.teacher.SubjectName;
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



  async updateTeacher( ): Promise<boolean> {
    return new Promise(async resolve => {
      await this.spinner.show();
      if (this.teacherForm.valid){
        this.teacherService.updateTeacher(this.teacher_id,this.teacherForm.value)
          .subscribe((res: any) => {
            console.log(res);
            this.teacherForm.reset();
            this.spinner.hide();
            this.alertService.success('Teacher Updated Successfully!');
            resolve(true);
          }, (error: any) => {
            console.log(error.error);
            this.alertService.success('Teacher Update Failed!');
            resolve(false);
            this.spinner.hide();
          });
      }
    });
  }





}
