import { Routes } from '@angular/router';
import { AuthGuard } from '../shared/auth-guard.service';
import { PageNotFoundComponent } from '../shared/not-found.component';
import { IndexComponent } from '../home/index/index.component';
import { LoggingModule } from '../logging/logging.module';
import { WarningModule } from '../warning/warning.module';
import { MonitorModule } from '../monitor/monitor.module';
import { ModuleWithProviders } from '@angular/core';
import { AppComponent } from '../app.component';
import { DashboardComponent } from '../home/dashboard/dashboard.component';

export const rootRoutes: Routes = [
    {
        path: '',
        component: AppComponent
    },
    {
        path: 'home',
        canActivate: [
            AuthGuard
        ],
        component: IndexComponent,
        children: [
            {
                path: 'dashboard',
                component: DashboardComponent,
                canLoad: [AuthGuard]
            },
            {
                path: 'logging',
                loadChildren: 'app/logging/logging.module#LoggingModule',
                canLoad: [AuthGuard]
            },
            {
                path: 'warning',
                loadChildren: 'app/warning/warning.module#WarningModule',
                canLoad: [AuthGuard]
            },
            {
                path: 'monitor',
                loadChildren: 'app/monitor/monitor.module#MonitorModule',
                canLoad: [AuthGuard]
                // data: { preload: true }
            },
        ]
    },
    { path: '**', component: PageNotFoundComponent }
];
