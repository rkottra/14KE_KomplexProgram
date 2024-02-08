import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { UserComponent } from './user.component';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        FormsModule
      ],
      declarations: [ UserComponent ]
      
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Létrejött-e a User komponens', () => {
    expect(component).toBeTruthy();
  });

  it('Login fieldset van-e', () => {
    try {
      component.logout();
      setTimeout(() => {
        
      }, 3000);
      fixture.detectChanges();
    } catch {
      
    }
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('legend')?.textContent).toContain('Login');
  });

  it('Logout fieldset van-e', () => {
    component.login();
    setTimeout(() => {
      
    }, 3000);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('legend')?.textContent).toContain('Logout');
  });
});
