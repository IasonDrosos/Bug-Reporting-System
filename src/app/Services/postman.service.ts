import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Bug } from '../models/bug.model';
import { Filter } from '../models/filter.model';
import { Observable, Subject } from 'rxjs';
import { Config } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class PostmanService {
  lightMode = false;
  modeSubject = new Subject<boolean>();
  endpoint = 'https://bug-report-system-server.herokuapp.com/bugs';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'my-auth-token'
    })
  };

  constructor(private http: HttpClient) { }

  getTheBugs(): Observable<HttpResponse<Config>> {
    return this.http.get<Config>(
      this.endpoint, { observe: 'response' });
  }

  getBugById(bugId) {
    return this.http.get(this.endpoint + '/' + bugId);
  }

  getBugsByFilter(filterParams: Filter): Observable<HttpResponse<Config>> {
    let sort = ``;
    if (filterParams.sort.column) {
      sort = `&sort=${filterParams.sort.column},${filterParams.sort.direction}`;
    }
    return this.http.get<Config>(this.endpoint + `?priority=${filterParams.priority}&title=${filterParams.title}&status=${filterParams.status}&reporter=${filterParams.reporter}&page=${filterParams.page}${sort}`, { observe: 'response' });
  }

  editBug(bug: Bug) {
    return this.http.put(this.endpoint + '/' + bug.id, bug, this.httpOptions).subscribe();
  }

  createBug(bug: Bug) {
    return this.http.post(this.endpoint, bug, this.httpOptions).subscribe();
  }

  getConfigResponse(): Observable<HttpResponse<Config>> {
    return this.http.get<Config>(this.endpoint, { observe: 'response' });
  }

  delBug(id) {
    return this.http.delete(this.endpoint + '/' + id, this.httpOptions).subscribe();
  }

  getLocalStorageStatus() {
    if (localStorage.getItem('lightMode') !== null) {
      this.lightMode = JSON.parse(localStorage.getItem('lightMode'));
      return this.lightMode;
    }
  }

  switchMode() {
    this.lightMode = !this.lightMode;
    this.modeSubject.next(this.lightMode);
    localStorage.setItem('lightMode', this.lightMode.toString());
  }

}
