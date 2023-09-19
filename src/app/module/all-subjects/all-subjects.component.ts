import {Component, OnInit} from '@angular/core';
import {TeacherService} from "../../core/services/teacher/teacher.service";
import {Router} from "@angular/router";
import {SubjectService} from "../../core/services/subject/subject.service";

@Component({
  selector: 'app-all-subjects',
  templateUrl: './all-subjects.component.html',
  styleUrls: ['./all-subjects.component.scss']
})
export class AllSubjectsComponent implements OnInit{

  subjects: any[] = [];


  constructor(private subjectService: SubjectService,
              private router: Router) {
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

  navigateToViewSubjects(authorId:any) {
    this.router.navigate(['/view-subject'], { queryParams: { id: authorId } }); // Use the route path to "view-books"
  }

  navigateToUpdateSubjects(authorId:any) {
    this.router.navigate(['/update-subject'], { queryParams: { id: authorId } }); // Use the route path to "view-books"
  }
}
