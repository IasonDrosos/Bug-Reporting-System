import { Component, OnInit } from '@angular/core';
import { Sorting } from 'src/app/models/sorting.model';
import { PostmanService } from 'src/app/Services/postman.service';
import { faLongArrowAltUp } from '@fortawesome/free-solid-svg-icons';
import { faLongArrowAltDown, faCircle, faPlusCircle, faPencilAlt, faComment, faTimes, faCheck, faExclamation } from '@fortawesome/free-solid-svg-icons';
import { NgbAccordion } from '@ng-bootstrap/ng-bootstrap';
import { empty } from 'rxjs';


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

  bugList;
  collapsedRow = [];
  // expanded = false;
  constructor(private postmanService: PostmanService) { }

  ngOnInit() {

    this.postmanService.getTheBugs().subscribe(data => {
      this.bugList = data;
      this.collapsedRow.length = this.bugList.length;
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

    this.postmanService.sortBy(this.sortedBy).subscribe(data => { this.bugList = data;
      this.collapsedRow.fill(true);
    });

  }

  changeCollapseStatus(rowIndex: number) {
    this.collapsedRow[rowIndex] = !this.collapsedRow[rowIndex];
  }




}
