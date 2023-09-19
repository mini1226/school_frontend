import {Component, OnInit} from '@angular/core';
import {SubjectService} from "../../core/services/subject/subject.service";
import {ActivatedRoute} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {NgxSpinnerService} from "ngx-spinner";
import {AlertService} from "ngx-alerts";

@Component({
  selector: 'app-update-subject',
  templateUrl: './update-subject.component.html',
  styleUrls: ['./update-subject.component.scss']
})
export class UpdateSubjectComponent implements OnInit{
  subject_id: any;

  SubjectID:any;
  SubjectNamee: any;
  Descriptionn: any;
  Teachers: any;

  subjectForm = new FormGroup({
    SubjectName: new FormControl('', [Validators.required]),
    Description: new FormControl('', [Validators.required])
  });

  constructor(private subjectService: SubjectService,
              private route: ActivatedRoute,
              private spinner: NgxSpinnerService,
              private alertService: AlertService) {
  }


  async ngOnInit(): Promise<any> {
    // Extract the ID from the route parameters
    await this.spinner.show();
    this.route.queryParams.subscribe(params => {
      this.subject_id = params['id'];
      if (this.subject_id) {
        this.loadSubjectById(this.subject_id);
      }
    });
    await this.spinner.hide();
  }



  async loadSubjectById(id:any): Promise<boolean> {
    return new Promise(async resolve => {
      await this.spinner.show();
      this.subjectService.getSubjectById(id).subscribe({
        next:(res)=>{
          this.SubjectID = res.subject.SubjectID;
          this.SubjectNamee = res.subject.SubjectName;
          this.Descriptionn = res.subject.Description;
          this.Teachers = res.subject.Teachers;
          this.spinner.hide();
          resolve(true);
        },
        error:() => {
          resolve(false);
          this.spinner.hide();
        }
      });
    });
  }


  get SubjectName(): any {
    return this.subjectForm.get('SubjectName');
  }

  get Description(): any {
    return this.subjectForm.get('Description');
  }



  async updateSubject( ): Promise<boolean> {
    return new Promise(async resolve => {
      await this.spinner.show();
      if (this.subjectForm.valid){
        this.subjectService.updateSubject(this.subject_id,this.subjectForm.value)
          .subscribe((res: any) => {
            console.log(res);
            this.alertService.success('Subject Updated Successfully!');
            this.subjectForm.reset();
            this.spinner.hide();
            resolve(true);
          }, (error: any) => {
            console.log(error.error);
            this.alertService.success('Subject Update Failed!');
            resolve(false);
            this.spinner.hide();
          });
      }
    });
  }



}
