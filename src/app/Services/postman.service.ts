import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Sorting } from '../models/sorting.model';

@Injectable({
  providedIn: 'root'
})
export class PostmanService {


  endpoint = 'https://bug-report-system-server.herokuapp.com/bugs';
  constructor(private http: HttpClient) { }

  getTheBugs() {
    return this.http.get(this.endpoint);
  }

  getBugById(bugId) {
    return this.http.get(this.endpoint + '/' + bugId);
  }

  sortBy(sortedBy: Sorting) {
    return this.http.get(this.endpoint + '?sort=' + sortedBy.column + ',' + sortedBy.direction);
  }

}
