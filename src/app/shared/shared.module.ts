import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpUtilityService } from './http.service';
import { Ng2Webstorage } from 'ngx-webstorage';

@NgModule({
  imports: [
    CommonModule,
    Ng2Webstorage
  ],
  exports: [],
  declarations: [],
  providers: [
    HttpUtilityService
  ]
})
export class SharedModule { }
