import { Component, OnInit } from '@angular/core';
import { BusServiceService } from '../../services/bus-service.service';
import { BusInfoByOrganizationViewModel } from '../../models/models';

@Component({
  selector: 'app-bus-report',
  templateUrl: './bus-report.component.html',
  styleUrls: ['./bus-report.component.css'],
  providers: [BusServiceService]
})
export class BusReportComponent implements OnInit {
  private serviceInfo: BusInfoByOrganizationViewModel[];
  private organisations: string[];

  constructor(private busService: BusServiceService) { }

  ngOnInit() {
    this.busService.getBusReportData().subscribe(data => {
      this.serviceInfo = this.busService.converToOrganizationViewModel(data);
      this.organisations = this.busService.getOrganisationNamesFromOrganisationViewModel(this.serviceInfo);
    });
  }

  private getOrgByName(orgName: string) {
    if (orgName && this.serviceInfo) {
      return this.busService.getOrganizationByName(orgName, this.serviceInfo);
    }
  }
}
