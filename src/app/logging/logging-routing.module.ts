import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { loggingRouteConfig } from '../router/logging.router';

@NgModule({
  imports: [
    RouterModule.forChild(loggingRouteConfig)
  ],
  exports: [
    RouterModule
  ]
})
export class LoggingRoutingModule { }
