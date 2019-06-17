import { TestBed } from '@angular/core/testing';
import { PostmanService } from './postman.service';
import { BugFormComponent } from '../main/bug-form/bug-form.component';
import { BugListComponent } from '../main/bug-list/bug-list.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('PostmanService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    declarations: [ BugFormComponent, BugListComponent ],
      imports: [FormsModule, HttpClientModule, RouterTestingModule, BrowserModule, NgbModule, FontAwesomeModule, BrowserAnimationsModule]
  }));

  it('should be created', () => {
    const service: PostmanService = TestBed.get(PostmanService);
    expect(service).toBeTruthy();
  });
});
