import { Component, OnInit, OnDestroy } from '@angular/core';
import { PostmanService } from '../Services/postman.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
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

  switchMode() {
    this.postmanService.switchMode();
  }

  ngOnDestroy() {
    this.modeSub.unsubscribe();
  }
}
