import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorage, SessionStorage } from 'ngx-webstorage';

@Component({
  selector: 'app-home-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  @SessionStorage()
  private accessToken: string;
  @SessionStorage()
  private refreshToken: string;
  @LocalStorage()
  private accessPersistenceToken: string;
  @LocalStorage()
  private refreshPersistenceToken: string;

  constructor(private router: Router) { }

  logout() {
    this.accessToken = null;
    this.accessPersistenceToken = null;
    this.refreshToken = null;
    this.refreshPersistenceToken = null;

    this.router.navigate(['/authorize']);
  }

  ngOnInit() {
    setTimeout(() => {
      this.router.navigate(['/home/dashboard']);
    }, 1000);
  }
}
