import { Component, OnInit } from '@angular/core';
import { Sorting } from 'src/app/models/sorting.model';
import { PostmanService } from 'src/app/Services/postman.service';
import { faLongArrowAltUp } from '@fortawesome/free-solid-svg-icons';
import { faLongArrowAltDown, faCircle, faPlusCircle, faPencilAlt, faComment, faTimes, faCheck, faExclamation, faSyncAlt } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { timeout } from 'q';


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
  faSyncAlt = faSyncAlt;

  sortedBy: Sorting = { column: '', direction: '' };
  stateDirection = 0; // 0 none //1 asc // 2 desc
  stateColumn = '';

  syncTime = '5:00';
  interval;


  bugList = [];
  collapsedRow = [];
  constructor(private postmanService: PostmanService, private router: Router) { }

  ngOnInit() {

    this.postmanService.getTheBugs().subscribe((data: []) => {
      this.bugList = data;


      this.bugList.map(bug => {
        if (bug.title) {
          bug.title = bug.title.toLowerCase().charAt(0).toUpperCase() + bug.title.slice(1);
        }
        if (bug.status) {
          bug.status = bug.status.toLowerCase().charAt(0).toUpperCase() + bug.status.slice(1);
        }
        return bug;
      });

      this.collapsedRow.length = this.bugList.length;
      //  me to apo pano sigoureuoume oti to collapsedRow array 8a exei toses 8eseis oso kai to bugList pou erxetai
      this.collapsedRow.fill(true);
      // console.log(data);


      this.startTimer(300);


    });
    // priority: string, tile: string, status: string, reporter: string
    let cdsksdh = { priority: '1', tile: 'Bug 002', status: 'Ready for test', reporter: 'QA' }
    this.postmanService.getBugsByFilter(cdsksdh).subscribe((data: []) => { this.bugList = data; console.log(data); });







  }

  sortTheBugs(column: string) {
    clearInterval(this.interval);
    this.startTimer(300);

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

    this.postmanService.sortBy(this.sortedBy).subscribe((data: []) => {
      this.bugList = data;
      this.collapsedRow.fill(true);


      this.bugList.map(bug => {
        if (bug.title) {
          bug.title = bug.title.toLowerCase().charAt(0).toUpperCase() + bug.title.slice(1);
        }
        if (bug.status) {
          bug.status = bug.status.toLowerCase().charAt(0).toUpperCase() + bug.status.slice(1);
        }
        return bug;
      });

    });

  }

  changeCollapseStatus(rowIndex: number) {
    this.collapsedRow[rowIndex] = !this.collapsedRow[rowIndex];
  }

  editBug(bugID) {
    clearInterval(this.interval);
    console.log(bugID);
    this.router.navigate(['edit', bugID]);
  }

  createBug() {
    this.router.navigate(['create']);
  }
  syncBugs() {
    clearInterval(this.interval);

    this.startTimer(300);
    this.postmanService.getTheBugs().subscribe((data: []) => {
      this.bugList = data;

      this.bugList.map(bug => {
        if (bug.title) {
          bug.title = bug.title.toLowerCase().charAt(0).toUpperCase() + bug.title.slice(1);
        }
        if (bug.status) {
          bug.status = bug.status.toLowerCase().charAt(0).toUpperCase() + bug.status.slice(1);
        }
        return bug;
      });

    });
    this.stateDirection = 0;
    this.stateColumn = '';
    this.sortedBy = { column: '', direction: '' };


  }

  startTimer(counDownInSeconds: number) {

    this.interval = setInterval(() => {
      const minutes = Math.floor(counDownInSeconds / 60);
      const seconds = counDownInSeconds % 60;

      let sminutes = minutes < 10 ? '0' + minutes : minutes;
      let sseconds = seconds < 10 ? '0' + seconds : seconds;


      if (sminutes !== '0') {
        this.syncTime = minutes + ':' + sseconds;
      } else {
        this.syncTime = minutes + ':' + sseconds + '0';
      }
      counDownInSeconds--;
      if (counDownInSeconds === -1) {
        clearInterval(this.interval);
        this.syncBugs();
      }

    }, 1000);
  }


}

