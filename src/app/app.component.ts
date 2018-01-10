import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './shared/auth.service';

@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`,
  styleUrls: []
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
    if (this.authService.checkAuthorize()) {
      this.router.navigate(['/home']);
    } else {
      this.router.navigate(['/authorize']);
    }
  }
}
