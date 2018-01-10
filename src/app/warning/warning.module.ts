import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WarningListComponent } from './warning-list/warning-list.component';
import { WarningDetailComponent } from './warning-detail/warning-detail.component';
import { WarningRoutingModule } from './warning-routing.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  imports: [
    CommonModule,
    WarningRoutingModule,
    NgxDatatableModule,
    ModalModule.forRoot()
  ],
  declarations: [
    WarningListComponent,
    WarningDetailComponent
  ]
})
export class WarningModule { }
