import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { UserModule } from './user/user.module';
import { HomeModule } from './home/home.module';
import { PageNotFoundComponent } from './shared/not-found.component';
import { AppRoutingModule } from './app-router.module';
import { AuthGuard } from './shared/auth-guard.service';
import { AuthService } from './shared/auth.service';
import { SharedModule } from './shared/shared.module';
import { SimplifyTransformPipe } from './pipe/simplify-transform.pipe';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    HomeModule,
    UserModule,
    SharedModule,
    AppRoutingModule
  ],
  providers: [
    AuthGuard,
    AuthService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
