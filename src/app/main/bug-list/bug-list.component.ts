import { Component, OnInit } from '@angular/core';
import { Sorting } from 'src/app/models/sorting.model';
import { PostmanService } from 'src/app/Services/postman.service';
import { faLongArrowAltUp } from '@fortawesome/free-solid-svg-icons';
import { faLongArrowAltDown, faCircle, faPlusCircle, faPencilAlt, faComment, faTimes, faCheck, faExclamation, faSyncAlt } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { timeout } from 'q';
import { Filter } from 'src/app/models/filter.model';


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


  stateDirection = 0; // 0 none //1 asc // 2 desc
  stateColumn = '';

  syncTime = '5:00';
  interval;
  bugList;
  maxPages;
  collapsedRow = [];
  filterState = false;

  filter: Filter = {
    priority: '',
    title: '',
    status: '',
    reporter: '',
    page: 0,
    sort: { column: '', direction: '' }
  };

  constructor(private postmanService: PostmanService, private router: Router) { }

  ngOnInit() {

    // this.showConfigResponse();
    this.postmanService.getTheBugs().subscribe((data) => {
      this.bugList = data.body;
      this.maxPages = data.headers.get('totalpages');
      console.log(this.maxPages);
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

      this.startTimer(300);
    });

  }

  sortTheBugs(column: string) {
    clearInterval(this.interval);
    this.startTimer(300);

    this.filter.page = 0;
    this.stateColumn = column;

    if (this.filter.sort.column === null || this.filter.sort.column !== column) {
      this.filter.sort.column = column;
      this.filter.sort.direction = 'asc';
      this.stateDirection = 1;
    } else {
      if (this.filter.sort.direction === 'asc') {
        this.filter.sort.direction = 'desc';
        this.stateDirection = 2;
      } else {
        this.filter.sort.direction = 'asc';
        this.stateDirection = 1;
      }
    }

    this.postmanService.getBugsByFilter(this.filter).subscribe((data) => {
      this.bugList = data.body;
      this.maxPages = data.headers.get('totalpages');
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
  syncBugs() { //check
    clearInterval(this.interval);

    this.startTimer(300);
    this.postmanService.getTheBugs().subscribe((data) => {
      this.bugList = data.body;
      this.maxPages = data.headers.get('totalpages');

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
    this.postmanService.getTheBugs().subscribe((data) => { this.bugList = data.body; this.maxPages = data.headers.get('totalpages'); });
    this.stateDirection = 0;
    this.stateColumn = '';
    this.filter.sort = { column: '', direction: '' };


  }

  startTimer(counDownInSeconds: number) {

    this.interval = setInterval(() => {
      const minutes = Math.floor(counDownInSeconds / 60);
      const seconds = counDownInSeconds % 60;

      const sminutes = minutes < 10 ? '0' + minutes : minutes;
      const sseconds = seconds < 10 ? '0' + seconds : seconds;


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

  filterShow() {
    this.filterState = !this.filterState;
  }


  changePage(direction: string) {
    if (direction === 'next') {
      if (this.filter.page < this.maxPages - 1) {
        this.filter.page++;
        console.log('next');
        console.log(this.filter.page);
      }

    } else if (direction === 'previous') {
      if (this.filter.page !== 0) {
        this.filter.page--;
        console.log('previous');
        console.log(this.filter.page);

      }
    }
    this.filteredSearch();
  }
  filteredSearch() {
    this.postmanService.getBugsByFilter(this.filter).subscribe((data) => {
       this.bugList = data.body; this.maxPages = data.headers.get('totalpages'); });
  }
}

