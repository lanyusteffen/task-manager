import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { HttpUtilityService } from '../../shared/http.service';

@Component({
  selector: 'app-logging-detail',
  templateUrl: './logging-detail.component.html',
  styleUrls: ['./logging-detail.component.css']
})
export class LoggingDetailComponent implements OnInit {
  @ViewChild('childModal') public childModal: ModalDirective;
  @Input() title?: string;
  public logCollect = {serviceIdentity: '', level: '', body: '', logTime: ''};

  constructor(private http: HttpUtilityService) {
  }

  ngOnInit() {
  }

  show(id) {
    this.http.get('/log/getDetail?id=' + id, result => {
      if (result) {
        this.logCollect = result;
        this.childModal.show();
      }
    });
  }
  hide() {
    this.childModal.hide();
  }
}
