import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BusInfoByOrganization, BusNotesRequestModel } from '../models/models';

@Injectable()
export class BusApiService {

  constructor(private http: HttpClient) { }

  public getBusReportData(): Observable<BusInfoByOrganization[]> {
    return new Observable<BusInfoByOrganization[]>(o => {
      this.http.get('bus-services-data.json').subscribe((res: any) => {
        o.next(res.data as BusInfoByOrganization[]);
        o.complete();
      },
        // TODO: refactor this to a single responsiblity class but out of scope for the moment
        (e) => this.handleError(e, o));
    });
  }
  public updateBusReportNotes(notesRequest: BusNotesRequestModel): Observable<boolean> {
    return new Observable(o => {
      const endpointAddress = 'someAddress'; // TODO: replace with actual address via a service may be
      this.http.put(endpointAddress, notesRequest).subscribe((res: any) => {
        o.next(true);
        o.complete();
      },
        // TODO: refactor this to a single responsiblity class but out of scope for the moment
        (e) => {
          o.error(false);
          o.complete();
        });
    });
  }

  private handleError(response: HttpErrorResponse, o: any) {
    o.error(response);
    o.complete();
  }
}
