import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {TeacherService} from "../../core/services/teacher/teacher.service";
import {NgxSpinnerService} from "ngx-spinner";
import {AlertService} from "ngx-alerts";

@Component({
  selector: 'app-all-teachers',
  templateUrl: './all-teachers.component.html',
  styleUrls: ['./all-teachers.component.scss']
})
export class AllTeachersComponent implements OnInit{

  teachers: any[] = [];


  constructor(private teacherService: TeacherService,
              private router: Router,
              private spinner: NgxSpinnerService,
              private alertService: AlertService) {
  }

  async ngOnInit(): Promise<any> {
    await this.spinner.show();
    await this.loadAllTeachers();
    await this.spinner.hide();
  }


  async loadAllTeachers(): Promise<boolean> {
    return new Promise(async resolve => {
      await this.spinner.show();
      this.teacherService.getTeachers().subscribe({
        next:(res)=>{
          this.teachers = res.teachers;
          console.log(this.teachers);
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



  navigateToViewTeachers(TeacherID:any) {
    this.router.navigate(['/view-teacher'], { queryParams: { id: TeacherID } }); // Use the route path to "view-books"
  }

  navigateToUpdateTeachers(TeacherID:any) {
    this.router.navigate(['/update-teacher'], { queryParams: { id: TeacherID } }); // Use the route path to "view-books"
  }


  deleteTeachers(TeacherID: any) {
    return new Promise(async resolve => {
      await this.spinner.show();
      this.teacherService.deleteTeacher(TeacherID).subscribe({
        next:(res)=>{
          console.log(res);
          this.spinner.hide();
          this.alertService.success('Teacher deleted successfully!');
          resolve(true);
        },
        error:() => {
          resolve(false);
          this.spinner.hide();
          this.alertService.success('Teacher Delete Failed!');
        }
      });
    });
  }
}
