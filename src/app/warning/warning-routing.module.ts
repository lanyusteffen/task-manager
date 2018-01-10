import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { warningRouteConfig } from '../router/warning.router';

@NgModule({
  imports: [
    RouterModule.forChild(warningRouteConfig)
  ],
  exports: [
    RouterModule
  ],
  providers: []
})
export class WarningRoutingModule { }
