import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Sorting } from '../models/sorting.model';
import { Bug } from '../models/bug.model';
import { Filter } from '../models/filter.model';

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

  getTheBugs() {
    return this.http.get(this.endpoint);
  }

  getBugById(bugId) {
    return this.http.get(this.endpoint + '/' + bugId);
  }

  getBugsByFilter(filterParams: Filter ) {
    let sort =``;
    if(filterParams.sort.column)
    {
      sort = `&sort=${filterParams.sort.column},${filterParams.sort.direction}`;
    }
    return this.http.get(this.endpoint + `?priority=${filterParams.priority}&title=${filterParams.title}&status=${filterParams.status}&reporter=${filterParams.reporter}&page=${filterParams.page}${sort}`);
  }

  editBug(bug: Bug) {
    return this.http.put(this.endpoint + '/' + bug.id, bug, this.httpOptions).subscribe(data => console.log(data));
  }

  createBug(bug: Bug) {
    return this.http.post(this.endpoint, bug, this.httpOptions).subscribe(data => console.log(data));
  }
}
