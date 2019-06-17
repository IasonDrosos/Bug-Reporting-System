import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { PostmanService } from 'src/app/Services/postman.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-bug-form',
  templateUrl: './bug-form.component.html',
  styleUrls: ['./bug-form.component.css']
})
export class BugFormComponent implements OnInit, OnDestroy {
  @ViewChild('bugForm') myForm: NgForm;

  bugID: any = '';

  bug: any = {
    title: '',
    description: '',
    priority: 1,
    reporter: '',
    status: 'pending',
    createdAt: new Date(),
    comments: []
  };

  comment = {
    reporter: '',
    description: ''
  };

  buglist;
  alert: boolean;
  timeOutID;
  downloadTimer;

  modeSub = new Subscription();
  lightMode: boolean;

  constructor(private postmanService: PostmanService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    if (this.route.snapshot.params.id) {
      this.bugID = this.route.snapshot.params.id;
      this.postmanService.getBugById(this.bugID).subscribe(data => {
        this.bug = data;
        if (!this.bug.title) {
          this.bug.title = 'Bug title';
        } else {
          this.bug.title = this.bug.title.toLowerCase();
        }
        if (!this.bug.status) {
          this.bug.status = 'pending';
        } else if (this.bug.status.toLowerCase() !== 'done' && this.bug.status.toLowerCase() !== 'rejected' && this.bug.status.toLowerCase() !== 'ready for test' && this.bug.status.toLowerCase() !== 'pending') {
          this.bug.status = 'pending';
        } else {
          this.bug.status = this.bug.status.toLowerCase();
        }
        if (!this.bug.reporter) {
          this.bug.reporter = '';
        } else if (this.bug.reporter.toLowerCase() !== 'qa' && this.bug.reporter.toLowerCase() !== 'po' && this.bug.reporter.toLowerCase() !== 'dev') {
          this.bug.reporter = '';
        } else {
          this.bug.reporter = this.bug.reporter.toLowerCase();
        }
      });
    }

    if (localStorage.getItem('lightMode') === null) {
      this.lightMode = false;
    } else {
      this.lightMode = this.postmanService.getLocalStorageStatus();
    }
    this.modeSub = this.postmanService.modeSubject.subscribe(lightMode => this.lightMode = lightMode);
  }

  print(form: NgForm) {
    if (form.valid) {
      if (this.route.snapshot.params.id) {
        if (this.comment.reporter !== '' && this.comment.description !== '') {
          this.bug.comments.push(this.comment);
          this.comment = {
            reporter: '',
            description: ''
          };
        }
        this.postmanService.editBug(this.bug);
      } else {
        this.bug.title = this.bug.title.toLowerCase();
        this.postmanService.createBug(this.bug);
        this.timeOutID = setTimeout(() => this.router.navigate(['']), 10000);
        let timeleft = 9;
        this.downloadTimer = setInterval(function() {
          document.getElementById('countdown').innerHTML = timeleft + ' seconds';
          timeleft -= 1;
          if (timeleft <= 0) {
            clearInterval(this.downloadTimer);
          }
        }, 1000);
      }
      this.alert = true;
      setTimeout(() => this.alert = false, 10000);
    }
  }

  closeAlert() {
    this.alert = false;
  }

  bugList() {
    clearTimeout(this.timeOutID);
    clearInterval(this.downloadTimer);
    this.router.navigate(['']);
  }

  ngOnDestroy() {
    this.modeSub.unsubscribe();
  }

}

