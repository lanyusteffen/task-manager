import { Component, OnInit, HostBinding } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { HttpUtilityService } from '../../shared/http.service';

@Component({
  selector: 'app-monitor-detail',
  templateUrl: './monitor-detail.component.html',
  styleUrls: ['./monitor-detail.component.css']
})
export class MonitorDetailComponent implements OnInit {
  jobMonitors: any[];
  taskMonitor: any;
  serviceIdentity: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpUtilityService
  ) {}

  ngOnInit() {
    this.taskMonitor = this.route.snapshot.data['taskMonitorInfo'];
    this.jobMonitors = this.taskMonitor.jobs;
  }

  doJobBreaker($event, row: any) {
    const jobMonitor = row;
    const isVetoForBreaker = !jobMonitor.jobVeto;
    const taskMonitorId = this.taskMonitor.id;
    this.http.safeGet('/breaker/doForJob?serviceIdentity=' + jobMonitor.serviceIdentity
      + '&jobName=' + jobMonitor.jobName + '&jobGroup=' + jobMonitor.jobGroup
      + '&isVeto=' + (isVetoForBreaker), result => {
        if (result) {
          alert((isVetoForBreaker ? '终止' : '启用') + '调度作业'
            + jobMonitor.jobName + '(' + jobMonitor.jobGroup + ')' + '成功');
           this.http.safeGet('/heartbeat/getDetail?id=' + this.taskMonitor.id,
              innerResult => {
                this.taskMonitor = innerResult;
                this.jobMonitors = this.taskMonitor.jobs;
            }, err => {
              alert('刷新列表发生异常: ' + JSON.stringify(err));
            });
        } else {
          alert((isVetoForBreaker ? '终止' : '启用') + '调度作业'
            + jobMonitor.jobName + '(' + jobMonitor.jobGroup + ')' + '失败');
        }
    }, (err) => {
      alert((isVetoForBreaker ? '终止' : '启用') + '调度作业'
            + jobMonitor.jobName + '(' + jobMonitor.jobGroup + ')'
            + '发生异常: ' + JSON.stringify(err));
    });
    $event.stopPropagation();
  }

  canDeactivate(): Promise<boolean> | boolean {
    return true;
  }
}
