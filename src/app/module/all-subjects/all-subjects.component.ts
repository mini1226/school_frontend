import {Component, OnInit} from '@angular/core';
import {TeacherService} from "../../core/services/teacher/teacher.service";
import {Router} from "@angular/router";
import {SubjectService} from "../../core/services/subject/subject.service";
import {NgxSpinnerService} from "ngx-spinner";
import {timeout} from "rxjs";
import {AlertService} from "ngx-alerts";

@Component({
  selector: 'app-all-subjects',
  templateUrl: './all-subjects.component.html',
  styleUrls: ['./all-subjects.component.scss']
})
export class AllSubjectsComponent implements OnInit{

  subjects: any[] = [];


  constructor(private subjectService: SubjectService,
              private router: Router,
              private spinner: NgxSpinnerService,
              private alertService: AlertService) {
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

  navigateToViewSubjects(SubjectID:any) {
    this.router.navigate(['/view-subject'], { queryParams: { id: SubjectID } }); // Use the route path to "view-books"
  }

  navigateToUpdateSubjects(SubjectID:any) {
    this.router.navigate(['/update-subject'], { queryParams: { id: SubjectID } }); // Use the route path to "view-books"
  }

  async deleteSubjects(SubjectID: any) {
    return new Promise(async resolve => {
      await this.spinner.show();
      this.subjectService.deleteSubject(SubjectID).subscribe({
        next:(res)=>{
          console.log(res);
          resolve(true);
          this.alertService.success('Subject deleted successfully!');
          this.loadAllSubjects();
          this.spinner.hide();
        },
        error:() => {
          resolve(false);
          this.alertService.success('Subject Delete Failed!');
          this.spinner.hide();
        }
      });
    });
  }
}
