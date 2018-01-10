import { Component, OnInit, ViewContainerRef, ViewChild } from '@angular/core';
import { HttpUtilityService } from '../../shared/http.service';
import { Page } from '../../shared/page.request';
import { ModalDirective, ModalModule } from 'ngx-bootstrap/modal';
import { LoggingDetailComponent } from '../logging-detail/logging-detail.component';

@Component({
  selector: 'app-logging-list',
  templateUrl: './logging-list.component.html',
  styleUrls: ['./logging-list.component.css']
})
export class LoggingListComponent implements OnInit {

  @ViewChild('childModal') childModal: LoggingDetailComponent;

  logCollects: any;
  page = new Page();
  selectedId: number;

  constructor(private http: HttpUtilityService,
    private viewContainerRef: ViewContainerRef) { }

  setPage (pageInfo: any): void {
    this.page.pageNumber = pageInfo.offset;
    this.http.get('/log/getAll?pageIndex=' + this.page.pageNumber
        + '&pageSize=' + this.page.size, pagedData => {
      this.page = {size: pagedData.size, totalElements: pagedData.totalElements
        , totalPages: pagedData.totalPages, pageNumber: pagedData.number };
      this.logCollects = pagedData.content;
    });
  }

  ngOnInit() {
    this.setPage({ offset: 0 });
  }

  onSelect({ selected }) {
    const logCollect = selected[0];
    this.selectedId = logCollect.id;
    this.childModal.show(logCollect.id);
  }
}
