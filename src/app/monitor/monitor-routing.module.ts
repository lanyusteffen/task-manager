import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { monitorRouteConfig } from '../router/monitor.router';
import { MonitorDetailResolver } from './monitor-detail-resolver.service';
import { CanDeactivateGuard } from '../shared/deactivate-guard.service';

@NgModule({
  imports: [
    RouterModule.forChild(monitorRouteConfig)
  ],
  exports: [
    RouterModule
  ],
  providers: [
    MonitorDetailResolver,
    CanDeactivateGuard
  ]
})
export class MonitorRoutingModule { }
