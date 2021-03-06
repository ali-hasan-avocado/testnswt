import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { BusServiceService } from './bus-service.service';
import { BusApiService } from './bus-api.service';
import { BusStatuses } from '../models/bus-statuses.enum';
import { BusInfoByOrganization, BusInfoByOrganizationViewModel, BusInfo, BusInfoViewModel } from '../models/models';
describe('BusServiceService', () => {
  const mockData = [
    {
      'organisation': 'Sydney Buses',
      'date': '25/09/2015',
      'busData': [
        {
          'busId': '42612',
          'routeVariant': '891 2 1',
          'deviationFromTimetable': 77
        },
        {
          'busId': '29016',
          'routeVariant': '400 1 1',
          'deviationFromTimetable': 340
        },
        {
          'busId': '90467',
          'routeVariant': '393 1 1',
          'deviationFromTimetable': 220
        },
        {
          'busId': '88836',
          'routeVariant': 'M20 1 0',
          'deviationFromTimetable': -287
        },
        {
          'busId': '79367',
          'routeVariant': 'L21 2 1',
          'deviationFromTimetable': 347
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
          'deviationFromTimetable': 164
        },
        {
          'busId': '62788',
          'routeVariant': 'UNKNOWN',
          'deviationFromTimetable': null
        },
        {
          'busId': '14221',
          'routeVariant': '834 1 1',
          'deviationFromTimetable': 423
        }
      ]
    }
  ];
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ],
      providers: [BusServiceService, BusApiService]
    });
  });

  it('should be created', inject([BusServiceService, BusApiService], (service: BusServiceService) => {
    expect(service).toBeTruthy();
  }));
  it('should convert bus model to its view model correctly',
    inject([BusServiceService], (service: BusServiceService) => {
      const orgViewModel = service.converToOrganizationViewModel(mockData);
      expect(orgViewModel).toBeTruthy();
      expect(orgViewModel.length).toBe(2);
      expect(orgViewModel[0].busData.length).toBe(5);
      expect(orgViewModel[1].busData.length).toBe(3);
      expect(orgViewModel[0].busData[0].routeVariantCode).toBe('891');
      expect(orgViewModel[0].busData[0].routeVariantLessCode).toBe(' 2 1');
      expect(orgViewModel[0].busData[0].status).toBe(BusStatuses.Late);
      expect(orgViewModel[0].busData[3].status).toBe(BusStatuses.Early);
      expect(orgViewModel[1].busData[1].status).toBe(BusStatuses.Unknown);
      expect(orgViewModel[1].busData[1].routeVariantCode).toBe(undefined);
    }));
  it('should extract organizations from view model correctly',
    inject([BusServiceService, BusApiService], (service: BusServiceService) => {
      const orgViewModel = service.converToOrganizationViewModel(mockData);
      const organisationList = service.getOrganisationNamesFromOrganisationViewModel(orgViewModel);
      expect(organisationList).toBeTruthy();
      expect(organisationList.length).toBe(2);
      expect(organisationList[0]).toBe('Sydney Buses');
      expect(organisationList[1]).toBe('Westbus');
    }));
  it('should find orgnization in a collection',
    inject([BusServiceService, BusApiService], (service: BusServiceService) => {
      const toFind = 'Sydney Buses';
      const orgViewModel = service.converToOrganizationViewModel(mockData);

      const org = service.getOrganizationByName(toFind, orgViewModel);
      expect(org).toBeTruthy();
      expect(org.busData.length).toBe(5);
    }));
  it('should convert bus view model to notes view model correctly',
    inject([BusServiceService, BusApiService], (service: BusServiceService) => {
      const toFind = 'Sydney Buses';
      const orgViewModel = service.converToOrganizationViewModel(mockData);
      const org = service.getOrganizationByName(toFind, orgViewModel);
      org.notes = 'test notes';
      const notesModel = service.convertOrganisationViewModelToNotesModel(org);
      expect(notesModel).toBeTruthy();
      expect(notesModel.organisation).toBe('Sydney Buses');
      expect(notesModel.notes).toBe('test notes');
    }));
});
