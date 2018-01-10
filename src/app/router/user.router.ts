import { Routes } from '@angular/router';
import { AuthorizeComponent } from '../user/authorize/authorize.component';

export const userRouteConfig: Routes = [
    { path: 'authorize', component: AuthorizeComponent }
];
