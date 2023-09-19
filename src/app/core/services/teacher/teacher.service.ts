import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  constructor(private http: HttpClient) { }

  getTeachers(): Observable<any> {
    return this.http.get(environment.baseUrl + 'teachers');
  }

  addTeacher(teacher: any): Observable<any> {
    return this.http.post(environment.baseUrl + 'teachers',teacher);
  }

  getTeacherById(id:any): Observable<any> {
    return this.http.get(environment.baseUrl + 'teachers/'+id);
  }

}
