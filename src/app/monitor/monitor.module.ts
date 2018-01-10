import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MonitorListComponent } from './monitor-list/monitor-list.component';
import { MonitorDetailComponent } from './monitor-detail/monitor-detail.component';
import { MonitorRoutingModule } from './monitor-routing.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { PopoverModule } from 'ngx-bootstrap/popover';

@NgModule({
  imports: [
    CommonModule,
    MonitorRoutingModule,
    NgxDatatableModule,
    PopoverModule.forRoot()
  ],
  declarations: [
    MonitorListComponent,
    MonitorDetailComponent
  ]
})
export class MonitorModule { }
