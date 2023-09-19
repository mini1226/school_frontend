import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {TeacherService} from "../../core/services/teacher/teacher.service";

@Component({
  selector: 'app-all-teachers',
  templateUrl: './all-teachers.component.html',
  styleUrls: ['./all-teachers.component.scss']
})
export class AllTeachersComponent implements OnInit{

  teachers: any[] = [];


  constructor(private teacherService: TeacherService,
              private router: Router) {
  }

  async ngOnInit(): Promise<any> {
    await this.loadAllTeachers();
  }


  async loadAllTeachers(): Promise<boolean> {
    return new Promise(async resolve => {
      this.teacherService.getTeachers().subscribe({
        next:(res)=>{
          this.teachers = res.teachers;
          console.log(this.teachers);
          resolve(true);
        },
        error:() => {
          resolve(false);
        }
      });
    });
  }



  navigateToViewTeachers(authorId:any) {
    this.router.navigate(['/view-teacher'], { queryParams: { id: authorId } }); // Use the route path to "view-books"
  }

  navigateToUpdateTeachers(authorId:any) {
    this.router.navigate(['/update-teacher'], { queryParams: { id: authorId } }); // Use the route path to "view-books"
  }


}
