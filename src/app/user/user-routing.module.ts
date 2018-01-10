import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { userRouteConfig } from '../router/user.router';

@NgModule({
  imports: [
    RouterModule.forChild(userRouteConfig)
  ],
  exports: [
    RouterModule
  ],
  providers: []
})
export class UserRoutingModule {  }
