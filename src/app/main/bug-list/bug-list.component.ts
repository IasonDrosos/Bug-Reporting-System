import { Component, OnInit } from '@angular/core';
import { Sorting } from 'src/app/models/sorting';
import { PostmanService } from 'src/app/Services/postman.service';

@Component({
  selector: 'app-bug-list',
  templateUrl: './bug-list.component.html',
  styleUrls: ['./bug-list.component.css']
})
export class BugListComponent implements OnInit {

  sortedBy: Sorting = { sorted: '', direction: '' };
  mybugs;
  constructor(private postmanService: PostmanService) { }

  ngOnInit() {

    this.postmanService.getTheBugs().subscribe(data => { this.mybugs = data; console.log(data) });

  }

  sortTheBugs(sortThis) {
    if (this.sortedBy.sorted === null || this.sortedBy.sorted !== sortThis) {
      this.sortedBy.sorted = sortThis;
      this.sortedBy.direction = 'asc';
    } else if (this.sortedBy.sorted === sortThis) {
      if (this.sortedBy.direction === 'asc') {
        this.sortedBy.direction = 'desc';
      } else {
        this.sortedBy.direction = 'asc';
      }
    }

    this.postmanService.sortBy(this.sortedBy).subscribe(data => { this.mybugs = data; console.log(data) })

  }

}
