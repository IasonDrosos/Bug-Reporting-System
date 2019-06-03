import { Component, OnInit } from '@angular/core';
import { PostmanService } from 'src/app/Services/postman.service';

@Component({
  selector: 'app-bug-form',
  templateUrl: './bug-form.component.html',
  styleUrls: ['./bug-form.component.css']
})
export class BugFormComponent implements OnInit {
  bug: any = {
    id: '',
    title: '',
    description: '',
    priority: 0,
    reporter: '',
    status: '',
    createdAt: new Date(),
    comments: [{
      reporter: '',
      description: ''
    }]
  };

  buglist;


  constructor(private postmanService: PostmanService) { }

  ngOnInit() {
    this.postmanService.getTheBugs().subscribe(data => { this.buglist = data; console.log(this.buglist); } );
  }



}
