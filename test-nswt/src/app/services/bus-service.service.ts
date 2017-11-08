import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BusInfoByOrganization, BusInfoByOrganizationViewModel, BusInfo, BusInfoViewModel } from '../models/models';

@Injectable()
export class BusServiceService {

  constructor() { }


  public getBusReportData(): Observable<BusInfoByOrganization[]> {
    return new Observable<BusInfoByOrganization[]>(o => {
      // TODO: get data from json file logic sits here...
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
}
