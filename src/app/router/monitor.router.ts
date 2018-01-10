import { Routes } from '@angular/router';
import { MonitorListComponent } from '../monitor/monitor-list/monitor-list.component';
import { MonitorDetailComponent } from '../monitor/monitor-detail/monitor-detail.component';
import { CanDeactivateGuard } from '../shared/deactivate-guard.service';
import { MonitorDetailResolver } from '../monitor/monitor-detail-resolver.service';

export const monitorRouteConfig: Routes = [
    {
        path: '',
        component: MonitorListComponent
    },
    {
        path: ':id',
        component: MonitorDetailComponent,
        canDeactivate: [CanDeactivateGuard],
        resolve: {
            taskMonitorInfo: MonitorDetailResolver
        }
    }
];
