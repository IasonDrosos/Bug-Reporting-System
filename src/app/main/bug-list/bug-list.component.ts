import { Component, OnInit } from '@angular/core';
import { Sorting } from 'src/app/models/sorting.model';
import { PostmanService } from 'src/app/Services/postman.service';
import { faLongArrowAltUp } from '@fortawesome/free-solid-svg-icons';
import { faLongArrowAltDown, faCircle, faPlusCircle, faPencilAlt, faComment, faTimes, faCheck, faExclamation } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { NgbAccordion } from '@ng-bootstrap/ng-bootstrap';
import { empty, Subscriber } from 'rxjs';


@Component({
  selector: 'app-bug-list',
  templateUrl: './bug-list.component.html',
  styleUrls: ['./bug-list.component.css']
})
export class BugListComponent implements OnInit {
  faLongArrowAltUp = faLongArrowAltUp;
  faLongArrowAltDown = faLongArrowAltDown;
  faCircle = faCircle;
  faPlusCircle = faPlusCircle;
  faPencilAlt = faPencilAlt;
  faComment = faComment;
  faTimes = faTimes;
  faCheck = faCheck;
  faExclamation = faExclamation;

  sortedBy: Sorting = { column: '', direction: '' };
  stateDirection = 0; // 0 none //1 asc // 2 desc
  stateColumn = '';

  bugList = [];
  collapsedRow = [];
  // validStatusRow = [];
  constructor(private postmanService: PostmanService, private router: Router) { }

  ngOnInit() {

    this.postmanService.getTheBugs().subscribe((data: []) => {
      this.bugList = data;

      this.bugList.map(bug => {
        bug.title = bug.title.toLowerCase().charAt(0).toUpperCase() + bug.title.slice(1);
        bug.status = bug.status.toLowerCase().charAt(0).toUpperCase() + bug.status.slice(1);
        return bug;
      });

      this.collapsedRow.length = this.bugList.length; //  me auto sigoureuoume oti to collapsedRow array 8a exei toses 8eseis oso kai to bugList pou erxetai
      this.collapsedRow.fill(true);
      console.log(data);
    });

  }

  sortTheBugs(column: string) {
    this.stateColumn = column;

    if (this.sortedBy.column === null || this.sortedBy.column !== column) {
      this.sortedBy.column = column;
      this.sortedBy.direction = 'asc';
      this.stateDirection = 1;
    } else {
      if (this.sortedBy.direction === 'asc') {
        this.sortedBy.direction = 'desc';
        this.stateDirection = 2;
      } else {
        this.sortedBy.direction = 'asc';
        this.stateDirection = 1;
      }
    }

    this.postmanService.sortBy(this.sortedBy).subscribe(data => {
      this.bugList = data;
      this.collapsedRow.fill(true);
    });

  }

  changeCollapseStatus(rowIndex: number) {
    this.collapsedRow[rowIndex] = !this.collapsedRow[rowIndex];
  }

  editBug(bugID) {
    // this.router.navigate(['edit/' + bugID]);
    console.log(bugID);
    this.router.navigate(['edit', bugID]);
  }

}
