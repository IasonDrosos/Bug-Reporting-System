import { Component, OnInit } from '@angular/core';
import { PostmanService } from 'src/app/Services/postman.service';
import { NgForm } from '@angular/forms';
import { Bug } from 'src/app/models/bug.model';
import { Comment } from 'src/app/models/comment.model';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-bug-form',
  templateUrl: './bug-form.component.html',
  styleUrls: ['./bug-form.component.css']
})
export class BugFormComponent implements OnInit {
  bugID: any = '';

  bug: Bug;

  comment: Comment;

  buglist;


  constructor(private postmanService: PostmanService, private route: ActivatedRoute) { }

  ngOnInit() {
    if (this.route.snapshot.params['id']) {
      this.bugID = '5cf546f43ca0230017b9200b'; //this.route.snapshot.params['id'];
      this.postmanService.getBugById(this.bugID).subscribe((data: Bug) => { this.bug = data; console.log(this.bug); });
      console.log(this.bugID);

    }
  }


  Print(form: NgForm) {
    this.bug.comments.push(this.comment);
    console.log(this.bug);
    console.log(form.status);
  }

  submitForm() {
    if (this.bugID == null) {
      this.postmanService.createBug(this.bug);
    } else {
      this.postmanService.editBug(this.bug);
    }


  }


}
