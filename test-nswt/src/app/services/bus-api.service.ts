import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BusInfoByOrganization} from '../models/models';

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

  private handleError(response: HttpErrorResponse, o: any) {
    o.error(response);
    o.complete();
  }
}
