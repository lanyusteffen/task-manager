import { Component, OnInit, ViewContainerRef, ViewChild } from '@angular/core';
import { HttpUtilityService } from '../../shared/http.service';
import { Page } from '../../shared/page.request';
import { WarningDetailComponent } from '../warning-detail/warning-detail.component';
import { ModalDirective, ModalModule } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-warning-list',
  templateUrl: './warning-list.component.html',
  styleUrls: ['./warning-list.component.css']
})
export class WarningListComponent implements OnInit {
  @ViewChild('childModal') childModal: WarningDetailComponent;

  taskWarnings: any;
  page = new Page();
  selectedId: number;

  constructor(private http: HttpUtilityService) { }

  setPage (pageInfo: any): void {
    this.page.pageNumber = pageInfo.offset;
    this.http.get('/taskwarning/getAll?pageIndex=' + this.page.pageNumber
        + '&pageSize=' + this.page.size, pagedData => {
      this.page = {size: pagedData.size, totalElements: pagedData.totalElements
        , totalPages: pagedData.totalPages, pageNumber: pagedData.number };
      this.taskWarnings = pagedData.content;
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
