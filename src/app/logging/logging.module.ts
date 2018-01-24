import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoggingListComponent } from './logging-list/logging-list.component';
import { LoggingDetailComponent } from './logging-detail/logging-detail.component';
import { LoggingRoutingModule } from './logging-routing.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PipeModule } from '../pipe/pipe.module';

@NgModule({
  imports: [
    CommonModule,
    LoggingRoutingModule,
    PipeModule,
    NgxDatatableModule,
    ModalModule.forRoot()
  ],
  declarations: [
    LoggingListComponent,
    LoggingDetailComponent
  ]
})
export class LoggingModule { }
