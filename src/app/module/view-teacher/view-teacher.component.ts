import {Component, OnInit} from '@angular/core';
import {TeacherService} from "../../core/services/teacher/teacher.service";
import {ActivatedRoute} from "@angular/router";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-view-teacher',
  templateUrl: './view-teacher.component.html',
  styleUrls: ['./view-teacher.component.scss']
})
export class ViewTeacherComponent implements OnInit{

  teacher_id: any;

  TeacherID:any;
  FirstName: any;
  LastName: any;
  Email: any;
  Phone: any;
  SubjectID: any;
  SubjectName: any;

  constructor(private teacherService: TeacherService,
              private route: ActivatedRoute,
              private spinner: NgxSpinnerService) {
  }


  async ngOnInit(): Promise<any> {
    // Extract the ID from the route parameters
    await this.spinner.show();
    this.route.queryParams.subscribe(params => {
      this.teacher_id = params['id'];
      if (this.teacher_id) {
        this.loadTeacherById(this.teacher_id);
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
          this.FirstName = res.teacher.FirstName;
          this.LastName = res.teacher.LastName;
          this.Email = res.teacher.Email;
          this.Phone = res.teacher.Phone;
          this.SubjectID = res.teacher.SubjectID;
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


}
