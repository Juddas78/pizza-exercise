import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {

  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'pizza'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('pizza');
  });

  // it('should render title', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  // });
  describe('Not logged in user', () => {

    beforeEach(()=> {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.componentInstance;
      app.loggedIn = false;
      fixture.detectChanges();
    })
    it('should see login screen', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      expect(fixture.debugElement.query(By.css('.dashboard'))).toBeNull();
      expect(fixture.debugElement.query(By.css('.login'))).toBeTruthy();
      expect(compiled.querySelector('.login')).toBeTruthy();
    });

    it('should not see the order page', () => {
      fixture.componentInstance.logIn(false);
      fixture.componentInstance.loggedIn = false;
      fixture.detectChanges();
      expect(fixture.debugElement.query(By.css('.dashboard'))).toBeNull();//need to get to the bottom of why these are the opposite of what I am expecting
      expect(fixture.debugElement.query(By.css('.login'))).toBeTruthy();
    });
  })

  describe('Logged in user', () => { 

    beforeEach(()=> {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.componentInstance;
      fixture.detectChanges();
    })

    it('should not see login screen', () => {
      fixture.componentInstance.logIn(true);
      fixture.componentInstance.loggedIn = true;
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('.dashboard'))).toBeTruthy();//need to get to the bottom of why these are the opposite of what I am expecting
      expect(fixture.debugElement.query(By.css('.login'))).toBeNull();
    });
    it('should see order page', () => {
      fixture.componentInstance.logIn(true);
      fixture.componentInstance.loggedIn = true;
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('.dashboard'))).toBeTruthy();//need to get to the bottom of why these are the opposite of what I am expecting
      expect(fixture.debugElement.query(By.css('.login'))).toBeNull();
      // fixture.detectChanges();
      // expect(compiled).toBeTruthy();
    });
  });

  describe('logIn', () => {
    it('user logs in', () => {
      component.logIn(true);
      expect(component.loggedIn).toBeTrue();
    })
  })

});
