import { Component, OnInit, OnDestroy, HostBinding } from '@angular/core';
import { PostmanService } from 'src/app/Services/postman.service';
import { faLongArrowAltUp } from '@fortawesome/free-solid-svg-icons';
import { faLongArrowAltDown, faTimes, faCheck, faExclamation } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { Filter } from 'src/app/models/filter.model';
import { Subscription } from 'rxjs';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-bug-list',
  animations: [
    trigger('openClose', [
      state('open', style({
        height: '0px',
        opacity: 0,
        visibility: 'hidden'
      })),
      state('closed', style({
        padding: '0px 0px 50px 0px',
        height: '50px',
        opacity: 1,
      })),
      transition('open => closed', [
        animate('0.5s')
      ]),
      transition('closed => open', [
        animate('0.5s')
      ]),
    ]),
  ],
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

  // Αλλάζουν τα βελάκια στο Sort
  stateDirection = 0; // 0 none //1 asc // 2 desc
  stateColumn = '';
  syncTime = '5:00';
  interval; // ID of setInterval (used for stopping it)
  bugList;
  maxPages;
  collapsedRow = []; // used for comments dropdown status
  filterState = false;
  modeSub = new Subscription();
  lightMode: boolean;

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
    this.filteredSearch();

    if (localStorage.getItem('lightMode') === null) {
      this.lightMode = false;
    } else {
      this.lightMode = this.postmanService.getLocalStorageStatus();
    }
    this.modeSub = this.postmanService.modeSubject.subscribe(lightMode => this.lightMode = lightMode);
  }

  ngOnDestroy() {
    clearInterval(this.interval);
    this.modeSub.unsubscribe();
  }

  sortTheBugs(column: string) {
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
    this.filteredSearch();
  }

  changeCollapseStatus(rowIndex: number) {
    this.collapsedRow[rowIndex] = !this.collapsedRow[rowIndex];
  }

  delBug(id) {
    this.postmanService.delBug(id);
    this.syncBugs();
  }

  syncBugs() {
    this.filteredSearch();
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
      }
    } else if (direction === 'previous') {
      if (this.filter.page !== 0) {
        this.filter.page--;
      }
    }
    this.filteredSearch();
  }

  advancedSearch() {
    this.filter.page = 0;
    this.filteredSearch();
  }


  filteredSearch() {
    clearInterval(this.interval);
    this.startTimer(300);
    this.postmanService.getBugsByFilter(this.filter).subscribe((data) => {
      this.maxPages = data.headers.get('totalpages');
      this.bugList = this.capitalizeData(data.body);
      this.commentsCollapseSystem(this.bugList.length);
    });
  }

  capitalizeData(serverData) {
    serverData.map(bug => {
      if (bug.title) {
        bug.title = bug.title.toLowerCase().charAt(0).toUpperCase() + bug.title.slice(1);
      }
      if (bug.status) {
        bug.status = bug.status.toLowerCase();
      }
      if (bug.reporter) {
        bug.reporter = bug.reporter.toUpperCase();
      }
      return bug;
    });
    return serverData;
  }

  commentsCollapseSystem(bugListSize: number) {
    this.collapsedRow.length = bugListSize;
    this.collapsedRow.fill(true);
  }

  clearFilter() {
    this.filter.priority = '';
    this.filter.status = '';
    this.filter.reporter = '';
    this.filter.title = '';
    this.syncBugs();
  }

}
