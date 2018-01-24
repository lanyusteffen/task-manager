import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './index/index.component';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { PipeModule } from '../pipe/pipe.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    PipeModule,
    BsDropdownModule.forRoot()
  ],
  exports: [
    IndexComponent
  ],
  declarations: [
    IndexComponent,
    DashboardComponent
  ]
})
export class HomeModule { }
