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

  constructor(private busService: BusServiceService) { }

  ngOnInit() {
    this.busService.getBusReportData().subscribe(data => {
      this.serviceInfo = data;
      console.log(data);
    });
  }

}
