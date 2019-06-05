import { Component, OnInit } from '@angular/core';
import { PostmanService } from 'src/app/Services/postman.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

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
    status: 'Pending',
    createdAt: new Date(),
    comments: []
  };

  comment = {
    reporter: '',
    description: ''
  };

  buglist;


  constructor(private postmanService: PostmanService, private route: ActivatedRoute) { }

  ngOnInit() {
    if(this.route.snapshot.params['id']){
      this.bugID = this.route.snapshot.params['id'];
      this.postmanService.getBugById(this.bugID).subscribe(data => { this.bug = data; console.log(this.bug); } );
      console.log(this.bugID);
    }


  }


  Print(form: NgForm) {
    this.bug.comments.push(this.comment);
    console.log(this.bug);
    console.log(form.status);
  }


}
