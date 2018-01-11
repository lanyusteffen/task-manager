import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpUtilityService } from '../../shared/http.service';
import * as settings from "../../../assets/appsettings.json";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  private refreshInterval = 5;
  public intervalDescription = '刷新时间5秒';
  private refreshing = false;
  private autoRefreshBlockCount = 0;
  private maxAutoRefreshBlockCount = (<any>settings).MaxAutoRefreshBlockCount;

  tasks: any[];
  warnings: any[];
  logs: any[];

  private timer;

  changeInterval(seconds: number) {
    this.refreshInterval = seconds;
    if (seconds >= 60) {
      this.intervalDescription = '刷新时间' + (seconds / 60) + '分';
    } else {
      this.intervalDescription = '刷新时间' + seconds + '秒';
    }
    this.stopTimer();
    this.startTimer();
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
    this.refreshing = false;
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
          this.refreshing = true;
        });
      });
    });
  }

  private startTimer() {
    this.timer = setInterval(() => {
      if (this.refreshing) {
        this.refreshDashboard();
      } else {
        ++this.autoRefreshBlockCount;
      }
      if (this.autoRefreshBlockCount > this.maxAutoRefreshBlockCount) {
        this.stopTimer();
      }
    }, this.refreshInterval * 1000);
  }

  private stopTimer() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  ngOnInit() {
    this.refreshDashboard();
    setTimeout(() => {
      this.startTimer();
    }, this.refreshInterval * 1000);
  }

  ngOnDestroy() {
    this.stopTimer();
  }
}
