import { Component, OnInit } from '@angular/core';
import { HttpUtilityService } from '../../shared/http.service';
import { Page } from '../../shared/page.request';
import { Router } from '@angular/router';

@Component({
  selector: 'app-monitor-list',
  templateUrl: './monitor-list.component.html',
  styleUrls: ['./monitor-list.component.css']
})
export class MonitorListComponent implements OnInit {
  taskMonitors: any;
  page = new Page();
  selectedId: number;

  constructor(private http: HttpUtilityService, private router: Router) { }

  setPage (pageInfo: any): void {
    this.page.pageNumber = pageInfo.offset;
    this.http.get('/heartbeat/getAll?pageIndex=' + this.page.pageNumber
        + '&pageSize=' + this.page.size, pagedData => {
      this.page = {size: pagedData.size, totalElements: pagedData.totalElements
        , totalPages: pagedData.totalPages, pageNumber: pagedData.number };
      this.taskMonitors = pagedData.content;
    });
  }

  ngOnInit() {
    this.setPage({ offset: 0 });
  }

  doTaskBreaker($event, row: any) {
    const taskMonitor = row;
    const isVetoForBreaker = !taskMonitor.taskVeto;

    this.http.safeGet('/breaker/doForTask?serviceIdentity=' + taskMonitor.serviceIdentity
      + '&isVeto=' + (isVetoForBreaker), result => {
        if (result) {
          alert((isVetoForBreaker ? '终止' : '启用') + '任务'
            + taskMonitor.serviceIdentity + '成功');
          this.setPage({ offset: this.page.pageNumber });
        } else {
          alert((isVetoForBreaker ? '终止' : '启用') + '任务'
            + taskMonitor.serviceIdentity + '失败');
        }
    }, (err) => {
      alert((isVetoForBreaker ? '终止' : '启用') + '任务'
        + taskMonitor.serviceIdentity + '发生异常: ' + JSON.stringify(err));
    });
    $event.stopPropagation();
  }
  doHeartbeat($event, row: any) {
    const taskMonitor = row;
    this.http.safeGet(row['heartbeatUrl'], result => {
        if (result.MonitorInfos) {
          alert('任务' + taskMonitor.serviceIdentity + '心跳正常');
        } else {
          alert('任务' + taskMonitor.serviceIdentity + '心跳异常');
        }
    }, (err) => {
      alert('检测任务' + taskMonitor.serviceIdentity + '心跳发生异常: ' + JSON.stringify(err));
    });
    $event.stopPropagation();
  }
  onSelect({ selected }) {
    const taskMonitorInfo = selected[0];
    this.selectedId = taskMonitorInfo.id;
    this.router.navigate(['/home/monitor/' + this.selectedId]);
  }
}
