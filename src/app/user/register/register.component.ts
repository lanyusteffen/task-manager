import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { validatePassport } from '../validate.passport';
import { validatePassword } from '../validate.password';
import { RegisterRequest } from '../register.request';
import { HttpUtilityService } from '../../shared/http.service';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';
import { AuthorizeComponent } from '../authorize/authorize.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [
    HttpUtilityService
  ]
})
export class RegisterComponent implements OnInit {
  @Output()
  registerSuccess = new EventEmitter();

  messages = [
    '请依次输入注册信息.',
    '注册成功!',
    '注册失败'
  ];
  index = 0;

  public registerForm: FormGroup;
  public submitted: boolean; // keep track on whether form is submitted
  public events: any[] = []; // use later to display form changes

  constructor(private fb: FormBuilder, private httpUtilityService: HttpUtilityService,
    private router: Router) {
  }

  register(registerRequest: RegisterRequest, isValid: boolean) {
    this.submitted = true;
    const postData = JSON.stringify(registerRequest);
    this.httpUtilityService.post('/user/register', postData, result => {
      if (result.entityId > 0) {
        this.index = 1;
        setTimeout(() => {
          this.registerSuccess.emit();
        }, 3000);
      } else {
        this.messages[2] = result.errorMessage;
        this.index = 2;
      }
    });
  }

  subcribeToFormChanges() {
    const myFormValueChanges$ = this.registerForm.valueChanges;

    myFormValueChanges$.subscribe(x => this.events
        .push({ event: 'STATUS CHANGED', object: x }));
  }

  ngOnInit() {
    this.registerForm = this.fb.group(
      {
        passport: ['', [validatePassport]],
        nickName: ['', null],
        firstName: ['', null],
        lastName: ['', null],
        password: ['', [validatePassword]]
      }
    );

    // subscribe to form changes
    this.subcribeToFormChanges();
  }
}
