import { TestBed, inject } from '@angular/core/testing';

import { BusServiceService } from './bus-service.service';
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
      providers: [BusServiceService]
    });
  });

  it('should be created', inject([BusServiceService], (service: BusServiceService) => {
    expect(service).toBeTruthy();
  }));
  it('should convert bus model to its view model correctly',
    inject([BusServiceService], (service: BusServiceService) => {
      const orgViewModel = service.converToOrganizationViewModel(mockData);
      expect(orgViewModel).toBeTruthy();
      expect(orgViewModel.length).toBe(2);
      expect(orgViewModel.map(o => o.busData).length).toBe(8);
      expect(orgViewModel[0].busData.length).toBe(5);
      expect(orgViewModel[1].busData.length).toBe(3);
      expect(orgViewModel[0].busData[0].routeVariantCode).toBe('891');
      expect(orgViewModel[1].busData[1].routeVariantCode).toBe(undefined);
    }));
  it('should extract organizations from view model correctly',
    inject([BusServiceService], (service: BusServiceService) => {
      const orgViewModel = service.converToOrganizationViewModel(mockData);
      const organisationList = service.getOrganisationNamesFromOrganisationViewModel(orgViewModel);
      expect(organisationList).toBeTruthy();
      expect(organisationList.length).toBe(2);
      expect(organisationList[0]).toBe('Sydney Buses');
      expect(organisationList[1]).toBe('Westbus');
    }));
});
