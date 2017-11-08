import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BusInfoByOrganization, BusInfoByOrganizationViewModel, BusInfo, BusInfoViewModel } from '../models/models';

@Injectable()
export class BusServiceService {

  constructor(private http: HttpClient) { }


  public getBusReportData(): Observable<BusInfoByOrganization[]> {
    return new Observable<BusInfoByOrganization[]>(o => {
      this.http.get<BusInfoByOrganization[]>('bus-services-data.json').subscribe(data => {
        o.next(data);
        o.complete();
      },
        // TODO: refactor this to a single responsiblity class but out of scope for the moment
        (e) => this.handleError(e, o));
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
    vm.routeVariantCode = source.routeVariant && source.routeVariant.length >= 3 && source.routeVariant !== UNKNOWN
      ? source.routeVariant.substring(0, 3)
      : undefined;
  }
  public getOrganisationNamesFromOrganisationViewModel(source: BusInfoByOrganizationViewModel[]): string[] {
    // TODO: conversion logic for translating from model to view model at bus info level
    return source.map(s => s.organisation);
  }

  protected handleError(response: HttpErrorResponse, o: any) {
    o.error(response);
    o.complete();
  }
}
