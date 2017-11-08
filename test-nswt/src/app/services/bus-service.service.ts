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
    // TODO: conversion logic for translating from model to view model at organization level
    return [];
  }
  private converTobusInfoViewModel(source: BusInfo): BusInfoViewModel {
    // TODO: conversion logic for translating from model to view model at bus info level
    return null;
  }
  public getOrganisationNamesFromOrganisationViewModel(source: BusInfoByOrganizationViewModel[]): string[] {
    // TODO: conversion logic for translating from model to view model at bus info level
    return [];
  }
}
