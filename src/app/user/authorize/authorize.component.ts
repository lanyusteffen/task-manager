import { Component } from '@angular/core';
import { TabsModule } from 'ngx-bootstrap';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';

@Component({
  template: `<tabset [justified]="true">
    <tab heading='登录' (select)="changeTab('loginTab', $event)"
      [active]="isCurrentTab == 'loginTab'">
      <div style="margin-top:50px;">
        <app-login></app-login>
      </div>
    </tab>
    <tab heading='注册' (select)="changeTab('registerTab', $event)"
      [active]="isCurrentTab == 'registerTab'">
      <div style="margin-top:50px;">
        <app-register (registerSuccess)="goToLogin($event)"></app-register>
      </div>
    </tab>
  </tabset>`,
  styleUrls: []
})
export class AuthorizeComponent {
  isCurrentTab = 'loginTab'; // 进入页面时首先显示登录
  changeTab(type, e) {
    this.isCurrentTab = type;
  }
  goToLogin(e) {
    this.changeTab('loginTab', e);
  }
}
