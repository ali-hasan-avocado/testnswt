import { Component, OnInit } from '@angular/core';
import { BusServiceService } from '../../services/bus-service.service';
import { BusInfoByOrganizationViewModel } from '../../models/models';
import { BusStatuses } from '../../models/bus-statuses.enum';
import { BaseComponent } from '../base-component';

@Component({
  selector: 'app-bus-report',
  templateUrl: './bus-report.component.html',
  styleUrls: ['./bus-report.component.css'],
  providers: [BusServiceService]
})
export class BusReportComponent extends BaseComponent implements OnInit {
  private serviceInfo: BusInfoByOrganizationViewModel[];
  private organisations: string[];
  private expandCollpase: any = {};


  constructor(private busService: BusServiceService) {
    super();
  }

  ngOnInit() {
    this.busService.getBusReportData().subscribe(data => {
      this.serviceInfo = this.busService.converToOrganizationViewModel(data);
      this.organisations = this.busService.getOrganisationNamesFromOrganisationViewModel(this.serviceInfo);
      this.handleSuccess(false);
    }, this.handleError);
  }

  private getOrgByName(orgName: string): BusInfoByOrganizationViewModel {
    if (orgName && this.serviceInfo) {
      return this.busService.getOrganizationByName(orgName, this.serviceInfo);
    }
  }
  public toggle(orgName: string) {
    this.expandCollpase[orgName] = !this.expandCollpase[orgName];
  }
  private parseBusStatus(status: number): string {
    return BusStatuses[status];
  }
  public getStatusClasses(status: BusStatuses): string {
    const colClass = 'col-md-4';
    const stylesClasses = [
      { status: BusStatuses.Early, className: 'early' },
      { status: BusStatuses.Late, className: 'late' },
      { status: BusStatuses.OnTime, className: 'on-time' },
      { status: BusStatuses.Unknown, className: '' },
    ];
    const styleClass = stylesClasses.find(s => s.status === status).className;
    return `${colClass} ${styleClass}`;
  }
  public getExpandCollpaseClass(orgName: string) {
    const baseClass = 'fa';
    const iconClass = this.expandCollpase[orgName] ? 'fa-sort-asc' : 'fa-sort-desc';
    return `${baseClass} ${iconClass}`;
  }
  public onNotesSubmit(model: BusInfoByOrganizationViewModel) {
    this.busService.updatesNotes(model).subscribe(success=> this.handleSuccess(true), this.handleError);
  }

}
