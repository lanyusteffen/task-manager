import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { AlertModule } from 'ngx-bootstrap/alert';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { AlertComponent } from 'ngx-bootstrap/alert/alert.component';
import { AlertConfig } from 'ngx-bootstrap/alert/alert.config';
import { SharedModule } from '../shared/shared.module';
import { AuthorizeComponent } from './authorize/authorize.component';
import { UserRoutingModule } from './user-routing.module';
import { HttpModule } from '@angular/http';
import { AuthService } from '../shared/auth.service';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpModule,
    UserRoutingModule,
    TabsModule.forRoot(),
    AlertModule.forRoot(),
    ButtonsModule.forRoot()
  ],
  exports: [
    LoginComponent,
    RegisterComponent,
    AuthorizeComponent
  ],
  declarations: [
    LoginComponent,
    RegisterComponent,
    AuthorizeComponent
  ]
})
export class UserModule { }
