import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Sorting } from '../models/sorting.model';
import { Bug } from '../models/bug.model';

@Injectable({
  providedIn: 'root'
})
export class PostmanService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'my-auth-token'
    })
  };

  endpoint = 'https://bug-report-system-server.herokuapp.com/bugs';
  constructor(private http: HttpClient) { }

  getTheBugs(page: number) {
    return this.http.get(this.endpoint+'?page='+page);
  }

  getBugById(bugId) {
    return this.http.get(this.endpoint + '/' + bugId);
  }

  sortBy(sortedBy: Sorting, page:number) {
    return this.http.get(this.endpoint + '?sort=' + sortedBy.column + ',' + sortedBy.direction+'&page='+page);
  }

  editBug(bug: Bug) {
    return this.http.put(this.endpoint + '/' + bug.id, bug, this.httpOptions).subscribe(data => console.log(data));
  }

  createBug(bug: Bug) {
    return this.http.post(this.endpoint, bug, this.httpOptions).subscribe(data => console.log(data));
  }
}
