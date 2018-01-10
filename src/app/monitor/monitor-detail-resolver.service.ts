import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot,
         ActivatedRouteSnapshot } from '@angular/router';
import { HttpUtilityService } from '../shared/http.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class MonitorDetailResolver implements Resolve<any> {
  constructor(private http: HttpUtilityService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<any> {
    const id = route.params['id'];
    return this.http.getObservable('/heartbeat/getDetail?id=' + id, false);
  }
}
