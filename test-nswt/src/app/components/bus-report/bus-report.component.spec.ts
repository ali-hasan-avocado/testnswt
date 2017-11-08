import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BusServiceService } from '../../services/bus-service.service';
import { AppModule } from '../../app.module';
import { BusReportComponent } from './bus-report.component';
import { BusInfoByOrganizationViewModel } from '../../models/models';
import { BusStatuses } from '../../models/bus-statuses.enum';

describe('BusReportComponent', () => {
  let component: BusReportComponent;
  let fixture: ComponentFixture<BusReportComponent>;
  const mockData: BusInfoByOrganizationViewModel[] = [
    {
      'organisation': 'Sydney Buses',
      'date': '25/09/2015',
      'busData': [
        {
          'busId': '42612',
          'routeVariant': '891 2 1',
          'deviationFromTimetable': 77,
          'routeVariantCode': '891',
          'routeVariantLessCode': ' 2 1',
          'status': BusStatuses.Late
        },
        {
          'busId': '29016',
          'routeVariant': '400 1 1',
          'deviationFromTimetable': 340,
          'routeVariantCode': '400',
          'routeVariantLessCode': ' 1 1',
          'status': BusStatuses.Late
        },
        {
          'busId': '90467',
          'routeVariant': '393 1 1',
          'deviationFromTimetable': 220,
          'routeVariantCode': '393',
          'routeVariantLessCode': ' 1 1',
          'status': BusStatuses.Late
        },
        {
          'busId': '88836',
          'routeVariant': 'M20 1 0',
          'deviationFromTimetable': -287,
          'routeVariantCode': 'M20',
          'routeVariantLessCode': ' 1 0',
          'status': BusStatuses.Early
        },
        {
          'busId': '79367',
          'routeVariant': 'L21 2 1',
          'deviationFromTimetable': 347,
          'routeVariantCode': 'L21',
          'routeVariantLessCode': ' 2 1',
          'status': BusStatuses.Late
        }
      ]
    },
    {
      'organisation': 'Westbus',
      'date': '25/09/2015',
      'busData': [
        {
          'busId': '94811',
          'routeVariant': '664 2 1',
          'deviationFromTimetable': 164,
          'routeVariantCode': '664',
          'routeVariantLessCode': ' 2 1',
          'status': BusStatuses.Late
        },
        {
          'busId': '62788',
          'routeVariant': 'UNKNOWN',
          'deviationFromTimetable': null,
          'routeVariantCode': undefined,
          'routeVariantLessCode': undefined,
          'status': BusStatuses.OnTime
        },
        {
          'busId': '14221',
          'routeVariant': '834 1 1',
          'deviationFromTimetable': 423,
          'routeVariantCode': '834',
          'routeVariantLessCode': ' 1 1',
          'status': BusStatuses.Late
        }
      ]
    }
  ];
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      providers: [BusServiceService]
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
  it('should create get correct class for expand collpase icon', () => {
    expect(component.getExpandCollpaseClass('Westbus')).toBe('fa fa-sort-desc');
    component.toggle('Westbus');
    expect(component.getExpandCollpaseClass('Westbus')).toBe('fa fa-sort-asc');
  });
  it('should create get correct class for status colors', () => {
    expect(component.getStatusClasses(BusStatuses.Early)).toBe('col-md-4 early');
    expect(component.getStatusClasses(BusStatuses.Late)).toBe('col-md-4 late');
    expect(component.getStatusClasses(BusStatuses.OnTime)).toBe('col-md-4 on-time');
  });

});
