import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {SubjectService} from "../../core/services/subject/subject.service";

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

  constructor(private subjectService: SubjectService) {

  }

  get SubjectName(): any {
    return this.subjectForm.get('SubjectName');
  }

  get Description(): any {
    return this.subjectForm.get('Description');
  }



  addAuthor( ): Promise<boolean> {
    return new Promise(resolve => {
      if (this.subjectForm.valid){
        this.subjectService.addSubject(this.subjectForm.value)
          .subscribe((res: any) => {
            console.log(res);
            resolve(true);
          }, (error: any) => {
            console.log(error.error);
            resolve(false);
          });
      }
    });
  }


}
