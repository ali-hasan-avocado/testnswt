import { Component, OnInit } from '@angular/core';
import { BusServiceService } from '../../services/bus-service.service';
import { BusInfoByOrganizationViewModel } from '../../models/models';
import { BusStatuses } from '../../models/bus-statuses.enum';

@Component({
  selector: 'app-bus-report',
  templateUrl: './bus-report.component.html',
  styleUrls: ['./bus-report.component.css'],
  providers: [BusServiceService]
})
export class BusReportComponent implements OnInit {
  private serviceInfo: BusInfoByOrganizationViewModel[];
  private organisations: string[];
  private expandCollpase: any = {};

  constructor(private busService: BusServiceService) { }

  ngOnInit() {
    this.busService.getBusReportData().subscribe(data => {
      this.serviceInfo = this.busService.converToOrganizationViewModel(data);
      this.organisations = this.busService.getOrganisationNamesFromOrganisationViewModel(this.serviceInfo);
    });
  }

  private getOrgByName(orgName: string): BusInfoByOrganizationViewModel {
    if (orgName && this.serviceInfo) {
      return this.busService.getOrganizationByName(orgName, this.serviceInfo);
    }
  }
  private toggle(orgName: string) {
    this.expandCollpase[orgName] = !this.expandCollpase[orgName];
  }
  private parseBusStatus(status: number): string {
    return BusStatuses[status];
  }
  private getStatusClasses(status: BusStatuses): string {
    const colClass = 'col-md-4';
    let styleClass = 'on-time';
    if (status === BusStatuses.Early) {
      styleClass = 'early';
    } else if (status === BusStatuses.Late) {
      styleClass = 'late';
    }
    return `${colClass} ${styleClass}`;
  }
}
