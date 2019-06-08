import { Component, OnInit } from '@angular/core';
import { PostmanService } from 'src/app/Services/postman.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-bug-form',
  templateUrl: './bug-form.component.html',
  styleUrls: ['./bug-form.component.css']
})
export class BugFormComponent implements OnInit {
  bugID: any = '';

  bug: any = {
    title: '',
    description: '',
    priority: 1,
    reporter: '',
    status: 'pending' as string,
    createdAt: new Date(),
    comments: []
  };

  comment = {
    reporter: '',
    description: ''
  };

  buglist;

  alert: boolean;

  constructor(private postmanService: PostmanService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    if (this.route.snapshot.params.id) {
      this.bugID = this.route.snapshot.params.id;
      this.postmanService.getBugById(this.bugID).subscribe(data => {
        this.bug = data;
        if (!this.bug.status) {
          this.bug.status = 'pending';
        } else if (this.bug.status.toLowerCase() !== 'done' && this.bug.reporter.toLowerCase() !== 'rejected' && this.bug.reporter.toLowerCase() !== 'ready for test' && this.bug.reporter.toLowerCase() !== 'pending') {
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
        console.log(this.bug);
      });
      console.log(this.bugID);
    }
  }


  Print(form: NgForm) {
    if (form.valid) {
      if (this.route.snapshot.params.id) {
        if (this.comment.reporter !== '' && this.comment.description !== '') {
          this.bug.comments.push(this.comment);
        }
        this.postmanService.editBug(this.bug);
      } else {
        this.postmanService.createBug(this.bug);
        setTimeout(() => this.router.navigate(['']), 10000);
      }
      this.alert = true;
      setTimeout(() => this.alert = false, 10000);
      console.log(this.bug);
      console.log(form.status);
    }
  }

  closeAlert() {
    this.alert = false;
  }

  bugList() {
    this.router.navigate(['']);
  }

}
