import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { validatePassport } from '../validate.passport';
import { validatePassword } from '../validate.password';
import { LoginRequest } from '../login.request';
import { HttpUtilityService } from '../../shared/http.service';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';
import { LocalStorage, SessionStorage } from 'ngx-webstorage';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [
    HttpUtilityService
  ]
})
export class LoginComponent implements OnInit {
  messages = [
    '请输入账户密码进行登录.',
    '登录成功!',
    '登录失败'
  ];
  index = 0;

  @SessionStorage()
  accessToken: string;
  @SessionStorage()
  refreshToken: string;
  @LocalStorage()
  accessPersistenceToken: string;
  @LocalStorage()
  refreshPersistenceToken: string;
  @LocalStorage()
  isRememberMe: boolean;

  public loginForm: FormGroup;
  public submitted: boolean; // keep track on whether form is submitted
  public events: any[] = []; // use later to display form changes

  constructor(private fb: FormBuilder, private httpUtilityService: HttpUtilityService,
    private router: Router) {
  }

  login(loginRequest: LoginRequest, isValid: boolean) {
    this.submitted = true;
    const postData = JSON.stringify(loginRequest);
    this.httpUtilityService.post('/user/login', postData, result => {
      if (result.isValid) {
        if (result.judgeResult) {
          this.index = 1;
          this.isRememberMe = loginRequest.rememberMe;
          if (loginRequest.rememberMe) {
            this.accessPersistenceToken = result.entity.accessToken;
            this.refreshPersistenceToken = result.entity.refreshToken;
            this.accessToken = null;
            this.refreshToken = null;
          } else {
            this.accessToken = result.entity.accessToken;
            this.refreshToken = result.entity.refreshToken;
            this.accessPersistenceToken = null;
            this.accessPersistenceToken = null;
          }
          this.router.navigate(['/home']);
        } else {
          this.messages[2] = result.errorMessage;
          this.index = 2;
        }
      } else {
        this.messages[2] = result.errorMessage;
        this.index = 2;
      }
    });
  }

  subcribeToFormChanges() {
    const myFormValueChanges$ = this.loginForm.valueChanges;

    myFormValueChanges$.subscribe(x => this.events
        .push({ event: 'STATUS CHANGED', object: x }));
  }

  ngOnInit() {
    this.loginForm = this.fb.group(
      {
        passport: ['', [validatePassport]],
        password: ['', [validatePassword]],
        rememberMe: ['']
      }
    );

    // subscribe to form changes
    this.subcribeToFormChanges();
  }
}
