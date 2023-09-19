import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  constructor(private http: HttpClient) { }

  getSubjects(): Observable<any> {
    return this.http.get(environment.baseUrl + 'subjects');
  }

  addSubject(subject: any): Observable<any> {
    return this.http.post(environment.baseUrl + 'subjects',subject);
  }

}
