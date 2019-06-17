import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BugListComponent } from './bug-list.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

describe('BugListComponent', () => {
  let component: BugListComponent;
  let fixture: ComponentFixture<BugListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BugListComponent ],
      imports: [FormsModule, HttpClientModule, RouterTestingModule, BrowserModule, NgbModule, FontAwesomeModule, BrowserAnimationsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BugListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
