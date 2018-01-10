import { Component, OnInit } from '@angular/core';
import { HttpUtilityService } from '../../shared/http.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  tasks: any[];
  warnings: any[];
  logs: any[];

  constructor(private http: HttpUtilityService) { }

  trackByTask(index: number, task: any) {
    return task.id;
  }

  traceByWarning(index: number, taskWarning: any) {
    return taskWarning.id;
  }

  traceByLog(index: number, log: any) {
    return log.id;
  }

  ngOnInit() {
    setTimeout(() => {

      this.http.get('/heartbeat/getDashBoard', result => {
      if (result) {
          this.tasks = result;
        }
        this.http.get('/log/getDashBoard', result1 => {
          if (result1) {
            this.logs = result1;
          }
          this.http.get('/taskwarning/getDashBoard', result2 => {
            if (result2) {
              this.warnings = result2;
            }
          });
        });
      });
    }, 500);
  }

}
