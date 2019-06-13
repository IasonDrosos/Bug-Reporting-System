import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { PostmanService } from '../Services/postman.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit, OnDestroy {
  date = new Date();

  modeSub = new Subscription();
  lightMode: boolean;

  constructor(private postmanService: PostmanService) { }

  ngOnInit() {
    this.modeSub = this.postmanService.modeSubject.subscribe(lightMode => this.lightMode = lightMode);
  }
  ngOnDestroy() {
    this.modeSub.unsubscribe();
  }

}
