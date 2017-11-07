import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusReportComponent } from './bus-report.component';

describe('BusReportComponent', () => {
  let component: BusReportComponent;
  let fixture: ComponentFixture<BusReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
