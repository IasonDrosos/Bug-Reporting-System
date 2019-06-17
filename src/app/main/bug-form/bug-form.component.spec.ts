import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BugFormComponent } from './bug-form.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserModule } from '@angular/platform-browser';

describe('BugFormComponent', () => {
  let component: BugFormComponent;
  let fixture: ComponentFixture<BugFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BugFormComponent],
      imports: [FormsModule, HttpClientModule, RouterTestingModule, BrowserModule, ],
      providers: [{
        provide: ActivatedRoute,
        useValue: { snapshot: { params: {} } }
      }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BugFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('When the form is empty, I should get a (falsy) valid form', () => {
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const form = fixture.componentInstance.myForm.form;
      expect(form.valid).toBeFalsy();
    });
  });

  it('When the form has only the title, I should get a (falsy) valid form', () => {
    fixture.whenStable().then(() => {
      component.bug.title = 'kati me teser';
      component.bug.description = '';
      component.bug.reporter = '';
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        const form = fixture.componentInstance.myForm.form;
        expect(form.valid).toBeFalsy();
      });
    });
  });

  it('When the form has only the description, I should get a (falsy) valid form', () => {
    fixture.whenStable().then(() => {
      component.bug.title = '';
      component.bug.description = 'only the description';
      component.bug.reporter = '';
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        const form = fixture.componentInstance.myForm.form;
        expect(form.valid).toBeFalsy();
      });
    });
  });

  it('When the form has only the reporter, I should get a (falsy) valid form', () => {
    fixture.whenStable().then(() => {
      component.bug.title = '';
      component.bug.description = '';
      component.bug.reporter = 'dev';
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        const form = fixture.componentInstance.myForm.form;
        expect(form.valid).toBeFalsy();
      });
    });
  });

  it('When the form has all the inputs but the minimun length of title is not met, I should get a (falsy) valid form', () => {
    fixture.whenStable().then(() => {
      component.bug.title = 'bug';
      component.bug.description = 'This is a bug';
      component.bug.reporter = 'po';
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        const form = fixture.componentInstance.myForm.form;
        expect(form.valid).toBeFalsy();
      });
    });
  });

  it('When the form has all the inputs but the maximum length of title is not met, I should get a (falsy) valid form', () => {
    fixture.whenStable().then(() => {
      component.bug.title = 'bugota 03 by Alexander';
      component.bug.description = 'This is a bug';
      component.bug.reporter = 'po';
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        const form = fixture.componentInstance.myForm.form;
        expect(form.valid).toBeFalsy();
      });
    });
  });

  it('When the form has all the inputs but the minimun length of description is not met, I should get a (falsy) valid form', () => {
    fixture.whenStable().then(() => {
      component.bug.title = 'bug 03';
      component.bug.description = 'This';
      component.bug.reporter = 'po';
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        const form = fixture.componentInstance.myForm.form;
        expect(form.valid).toBeFalsy();
      });
    });
  });

  it('When the form has all the inputs but the maximum length of description is not met, I should get a (falsy) valid form', () => {
    fixture.whenStable().then(() => {
      component.bug.title = 'bug 03';
      component.bug.description = 'This is a very long description, completely unnecessary, almost mind bugling, but i have to right it in order to see if the requirements are tested correctly, which they do, but still, it has to be done. pffff X(';
      component.bug.reporter = 'po';
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        const form = fixture.componentInstance.myForm.form;
        expect(form.valid).toBeFalsy();
      });
    });
  });

  it('When the form has all the inputs with the minimum requirments I should get a (truthy) valid form', () => {
    fixture.whenStable().then(() => {
      component.bug.title = 'kati me teser';
      component.bug.description = 'this is a desc';
      component.bug.reporter = 'qa';
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        const form = fixture.componentInstance.myForm.form;
        expect(form.valid).toBeTruthy();
      });
    });
  });

});

