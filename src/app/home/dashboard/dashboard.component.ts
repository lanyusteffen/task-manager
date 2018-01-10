import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpUtilityService } from '../../shared/http.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  private refreshInterval: number;
  public intervalDescription = '刷新时间5秒';

  tasks: any[];
  warnings: any[];
  logs: any[];

  private timer;

  changeInterval(seconds: number) {
    this.refreshInterval = seconds;
    if (seconds > 60) {
      this.intervalDescription = '刷新时间' + (seconds / 60) + '分';
    } else {
      this.intervalDescription = '刷新时间' + seconds + '秒';
    }
  }

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

  private refreshDashboard() {
    this.http.get('/heartbeat/getDashBoard', result => {
      setTimeout(() => {
        this.startTimer();
      }, this.refreshInterval);
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
  }

  private startTimer() {
    this.timer = setInterval(() => {
      this.refreshDashboard();
    }, this.refreshInterval);
  }

  private stopTimer() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  ngOnInit() {
    this.refreshDashboard();
  }

  ngOnDestroy() {
    this.stopTimer();
  }
}
