import { Injectable } from '@angular/core';
import {delay, Observable} from "rxjs";
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  constructor(private http: HttpClient) { }

  getSubjects(): Observable<any> {
    return this.http.get(environment.baseUrl + 'subjects').pipe(delay(1000));
  }

  addSubject(subject: any): Observable<any> {
    return this.http.post(environment.baseUrl + 'subjects',subject).pipe(delay(1000));
  }

  getSubjectById(id:any): Observable<any> {
    return this.http.get(environment.baseUrl + 'subjects/'+id);
  }

  updateSubject(id: number, subject: any) {
    return this.http.put(environment.baseUrl + 'subjects/'+id, subject).pipe(delay(1000));
  }

  deleteSubject(id: any) {
    return this.http.delete(environment.baseUrl + 'subjects/'+id).pipe(delay(1000));
  }

}
