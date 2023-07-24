import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberdetailsComponent } from './memberdetails.component';

describe('MemberdetailsComponent', () => {
  let component: MemberdetailsComponent;
  let fixture: ComponentFixture<MemberdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemberdetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MemberdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
