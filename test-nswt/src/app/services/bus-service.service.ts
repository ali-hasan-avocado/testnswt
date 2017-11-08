import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BusApiService } from './bus-api.service';
import { BusStatuses } from '../models/bus-statuses.enum';
import { BusInfoByOrganization, BusInfoByOrganizationViewModel, BusInfo, BusInfoViewModel } from '../models/models';

@Injectable()
export class BusServiceService {

  constructor(private apiService: BusApiService) { }

  public getBusReportData(): Observable<BusInfoByOrganization[]> {
    return new Observable<BusInfoByOrganization[]>(o => {
      this.apiService.getBusReportData().subscribe((data: any) => {
        o.next(data as BusInfoByOrganization[]);
        o.complete();
      });
    });
  }

  public converToOrganizationViewModel(source: BusInfoByOrganization[]): BusInfoByOrganizationViewModel[] {
    // convert org models to view models
    const viewModels: BusInfoByOrganizationViewModel[] = source.map(bi => bi as BusInfoByOrganizationViewModel);
    viewModels.forEach((vm, i) => {
      vm.busData.forEach((bm, j) => {
        // populate bus view models
        this.converTobusInfoViewModel(bm);
      });
    });
    // return converted array
    return viewModels;
  }
  private converTobusInfoViewModel(source: BusInfo) {
    const UNKNOWN = 'UNKNOWN';
    const vm = source as BusInfoViewModel;
    if (source.routeVariant && source.routeVariant.length >= 3 && source.routeVariant !== UNKNOWN) {
      vm.routeVariantCode = source.routeVariant.substring(0, 3);
      vm.routeVariantLessCode = source.routeVariant.substring(3, source.routeVariant.length);
    }
    if (vm.deviationFromTimetable < 0) {
      vm.status = BusStatuses.Early;
    } else if (vm.deviationFromTimetable > 0) {
      vm.status = BusStatuses.Late;
    } else if (vm.deviationFromTimetable === 0) {
      vm.status = BusStatuses.OnTime;
    } else{
      vm.status = BusStatuses.Unknown;
    }
  }
  public getOrganisationNamesFromOrganisationViewModel(source: BusInfoByOrganizationViewModel[]): string[] {
    // TODO: conversion logic for translating from model to view model at bus info level
    return source.map(s => s.organisation);
  }

  public getOrganizationByName(orgName: string, orgCollectionToSearch: BusInfoByOrganizationViewModel[]): BusInfoByOrganizationViewModel {
    if (orgName && orgCollectionToSearch) {
      const found = orgCollectionToSearch.findIndex(o => o.organisation === orgName);
      return found >= 0 ? orgCollectionToSearch[found] : null;
    }
  }
}
