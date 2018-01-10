import { Routes } from '@angular/router';
import { LoggingListComponent } from '../logging/logging-list/logging-list.component';
import { LoggingDetailComponent } from '../logging/logging-detail/logging-detail.component';
import { CanDeactivateGuard } from '../shared/deactivate-guard.service';

export const loggingRouteConfig: Routes = [
    {
        path: '',
        component: LoggingListComponent
    }
];

