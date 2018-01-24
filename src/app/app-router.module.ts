import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { rootRoutes } from './router/app.router';
import { AuthGuard } from './shared/auth-guard.service';

@NgModule({
    imports: [
        RouterModule.forRoot(rootRoutes),
    ],
    exports: [
        RouterModule
    ],
    providers: [
        AuthGuard
    ],
    declarations:[]
})
export class AppRoutingModule {}
