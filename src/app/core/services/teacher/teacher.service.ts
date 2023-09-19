import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {delay, Observable} from "rxjs";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  constructor(private http: HttpClient) { }

  getTeachers(): Observable<any> {
    return this.http.get(environment.baseUrl + 'teachers').pipe(delay(1000));
  }

  addTeacher(teacher: any): Observable<any> {
    return this.http.post(environment.baseUrl + 'teachers',teacher).pipe(delay(1000));
  }

  getTeacherById(id:any): Observable<any> {
    return this.http.get(environment.baseUrl + 'teachers/'+id);
  }


  updateTeacher(id: number, teacher: any) {
    return this.http.put(environment.baseUrl + 'teachers/'+id, teacher).pipe(delay(1000));
  }

  deleteTeacher(id: any) {
    return this.http.delete(environment.baseUrl + 'teachers/'+id).pipe(delay(1000));
  }
}
