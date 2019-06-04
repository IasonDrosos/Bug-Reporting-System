import { Component, OnInit } from '@angular/core';
import { PostmanService } from 'src/app/Services/postman.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-bug-form',
  templateUrl: './bug-form.component.html',
  styleUrls: ['./bug-form.component.css']
})
export class BugFormComponent implements OnInit {
  bugID: any;

  bug = {
    title: '',
    description: '',
    priority: 0,
    reporter: '',
    status: 'Pending',
    createdAt: new Date(),
    comments: []
  };

  comment = {
    reporter: '',
    description: ''
  };

  buglist;


  constructor(private postmanService: PostmanService) { }

  ngOnInit() {
    this.postmanService.getTheBugs().subscribe(data => { this.buglist = data; console.log(this.buglist); } );
  }
  Print(form: NgForm) {
    this.bug.comments.push(this.comment);
    console.log(this.bug);
    console.log(form.status);
  }


}
