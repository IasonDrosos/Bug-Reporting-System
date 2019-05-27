import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Sorting } from '../models/sorting';

@Injectable({
  providedIn: 'root'
})
export class PostmanService {


  endpoint = "https://bug-report-system-server.herokuapp.com/bugs";
  constructor(private http: HttpClient) { }

  getTheBugs() {

    return this.http.get(this.endpoint);

  }

  sortBy(sortedBy: Sorting) {
    return this.http.get(this.endpoint + '?sort=' + sortedBy.sorted + ',' + sortedBy.direction);

  }
}
