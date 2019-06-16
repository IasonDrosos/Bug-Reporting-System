import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { PostmanService } from '../Services/postman.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, OnDestroy {
  modeSub = new Subscription();
  lightMode: boolean;

  constructor(private postmanService: PostmanService) { }

  ngOnInit() {
    if (localStorage.getItem('lightMode') === null) {
      this.lightMode = false;
    } else {
      this.lightMode = this.postmanService.getLocalStorageStatus();
    }
    this.modeSub = this.postmanService.modeSubject.subscribe(lightMode => this.lightMode = lightMode);



  }
  ngOnDestroy() {
    this.modeSub.unsubscribe();
  }

}
