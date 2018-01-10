import { Routes } from '@angular/router';
import { WarningListComponent } from '../warning/warning-list/warning-list.component';
import { WarningDetailComponent } from '../warning/warning-detail/warning-detail.component';

export const warningRouteConfig: Routes = [
    {
        path: '',
        component: WarningListComponent
    }
];

