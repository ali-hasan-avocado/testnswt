import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import {BusApiService} from './services/bus-api.service';
import { AppComponent } from './app.component';
import { BusReportComponent } from './components/bus-report/bus-report.component';


@NgModule({
  declarations: [
    AppComponent,
    BusReportComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule
  ],
  providers: [BusApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
