import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { HttpUtilityService } from '../../shared/http.service';

@Component({
  selector: 'app-warning-detail',
  templateUrl: './warning-detail.component.html',
  styleUrls: ['./warning-detail.component.css']
})
export class WarningDetailComponent implements OnInit {

  @ViewChild('childModal') public childModal: ModalDirective;
  @Input() title?: string;
  public taskWarning = {serviceIdentity: '', jobName: '', jobGroup: '', warningReason: '', addTime: ''};

  constructor(private http: HttpUtilityService) {
  }

  ngOnInit() {
  }

  show(id) {
    this.http.get('/taskwarning/getDetail?id=' + id, result => {
      if (result) {
        this.taskWarning = result;
        this.childModal.show();
      }
    });
  }
  hide() {
    this.childModal.hide();
  }
}
