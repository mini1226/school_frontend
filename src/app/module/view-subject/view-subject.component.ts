import {Component, OnInit} from '@angular/core';
import {TeacherService} from "../../core/services/teacher/teacher.service";
import {ActivatedRoute} from "@angular/router";
import {SubjectService} from "../../core/services/subject/subject.service";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-view-subject',
  templateUrl: './view-subject.component.html',
  styleUrls: ['./view-subject.component.scss']
})
export class ViewSubjectComponent implements OnInit{

  subject_id: any;

  SubjectID:any;
  SubjectName: any;
  Description: any;
  Teachers: any;

  constructor(private subjectService: SubjectService,
              private route: ActivatedRoute,
              private spinner: NgxSpinnerService) {
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
          this.SubjectName = res.subject.SubjectName;
          this.Description = res.subject.Description;
          this.Teachers = res.subject.Teachers;
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

}
