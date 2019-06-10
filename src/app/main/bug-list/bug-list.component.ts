import { Component, OnInit, OnDestroy } from '@angular/core';
import { PostmanService } from 'src/app/Services/postman.service';
import { faLongArrowAltUp } from '@fortawesome/free-solid-svg-icons';
import { faLongArrowAltDown, faTimes, faCheck, faExclamation } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bug-list',
  templateUrl: './bug-list.component.html',
  styleUrls: ['./bug-list.component.css']
})
export class BugListComponent implements OnInit, OnDestroy {
  // Init fontAwesome icons for template usage
  faLongArrowAltUp = faLongArrowAltUp;
  faLongArrowAltDown = faLongArrowAltDown;
  faTimes = faTimes;
  faCheck = faCheck;
  faExclamation = faExclamation;



  stateDirection = 0; // 0 none //1 asc // 2 desc
  stateColumn = '';

  syncTime = '5:00';
  interval;
  bugList = [];
  collapsedRow = []; // used for comments dropdown status
  filterState = false;

  filter = {
    priority: '',
    title: '',
    status: '',
    reporter: '',
    page: 0,
    sort: { column: '', direction: '' }
  };

  constructor(private postmanService: PostmanService, private router: Router) { }

  ngOnInit() {
    this.postmanService.getTheBugs().subscribe((data: []) => {
      this.startTimer(300);
      this.bugList = this.capitalizeData(data);
      this.commentsCollapseSystem(this.bugList.length);
    });
  }

  ngOnDestroy() {
    clearInterval(this.interval);
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

    this.postmanService.getBugsByFilter(this.filter).subscribe((data: []) => {
      this.bugList = this.capitalizeData(data);
      this.commentsCollapseSystem(this.bugList.length);
    });

  }

  changeCollapseStatus(rowIndex: number) {
    this.collapsedRow[rowIndex] = !this.collapsedRow[rowIndex];
  }

  editBug(bugID) {
    this.router.navigate(['edit', bugID]);
  }

  createBug() {
    this.router.navigate(['create']);
  }

  syncBugs() { // check
    clearInterval(this.interval);
    this.startTimer(300);

    this.postmanService.getTheBugs().subscribe((data: []) => {
      this.bugList = this.capitalizeData(data);
      this.commentsCollapseSystem(this.bugList.length);
    });

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
      this.filter.page++;
      console.log('next');
      console.log(this.filter.page);
    } else if (direction === 'previous') {
      if (this.filter.page !== 0) {
        this.filter.page--;
        console.log('previous');
        console.log(this.filter.page);

      }
    }
    // this.postmanService.getBugsByFilter(this.filter).subscribe((data: []) => {
    //   this.bugList = this.capitalizeData(data);
    //   this.commentsCollapseSystem(this.bugList.length);
    //   console.log(data);
    // });
    this.filteredSearch();
  }

  filteredSearch() {
    this.postmanService.getBugsByFilter(this.filter).subscribe((data: []) => {
      clearInterval(this.interval);
      this.startTimer(300);
      console.log(data);

      this.bugList = this.capitalizeData(data);
      this.commentsCollapseSystem(this.bugList.length);
    });
  }

  // Capitalize server data for proper validation and consistency
  capitalizeData(serverData) {
    serverData.map(bug => {
      if (bug.title) {
        bug.title = bug.title.toLowerCase().charAt(0).toUpperCase() + bug.title.slice(1);
      }
      if (bug.status) {
        bug.status = bug.status.toLowerCase().charAt(0).toUpperCase() + bug.status.slice(1);
      }
      return bug;
    });
    return serverData;
  }

  // sigoureuoume oti to collapsedRow array 8a exei toses 8eseis oso kai to bugList pou erxetai kai to arxikopououme se katastasi true
  commentsCollapseSystem(bugListSize: number) {
    this.collapsedRow.length = bugListSize;
    this.collapsedRow.fill(true);
  }



}

