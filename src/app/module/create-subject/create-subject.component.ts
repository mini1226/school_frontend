import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {SubjectService} from "../../core/services/subject/subject.service";
import {NgxSpinnerService} from "ngx-spinner";
import {AlertService} from "ngx-alerts";

@Component({
  selector: 'app-create-subject',
  templateUrl: './create-subject.component.html',
  styleUrls: ['./create-subject.component.scss']
})
export class CreateSubjectComponent {

  subjectForm = new FormGroup({
    SubjectName: new FormControl('', [Validators.required]),
    Description: new FormControl('', [Validators.required])
  });

  constructor(private subjectService: SubjectService,
              private spinner: NgxSpinnerService,
              private alertService: AlertService) {

  }

  get SubjectName(): any {
    return this.subjectForm.get('SubjectName');
  }

  get Description(): any {
    return this.subjectForm.get('Description');
  }



  async addSubject( ): Promise<boolean> {
    return new Promise(async resolve => {
      await this.spinner.show();
      if (this.subjectForm.valid){
        this.subjectService.addSubject(this.subjectForm.value)
          .subscribe((res: any) => {
            console.log(res);
            this.alertService.success('Subject Created successfully!');
            this.subjectForm.reset();
            this.spinner.hide();
            resolve(true);
          }, (error: any) => {
            console.log(error.error);
            this.alertService.success('Subject Create Failed!');
            resolve(false);
            this.spinner.hide();
          });
      }
    });
  }


}
