import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../models/User';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: User = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    birthDate: ''
  };

  // email: string;
  password: string;

  public readonly siteKey = '6LcBoZ8UAAAAAPkSXt9Q09J45BRBuEBmjP_yxza1';
  public aFormGroup: FormGroup;
  public theme: 'light' | 'dark' = 'light';
  public captchaIsLoaded = false;
  public captchaSuccess = false;
  public captchaIsExpired = false;
  public captchaResponse?: string;

  @ViewChild('userForm') form: any;

  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService,
    private formBuilder: FormBuilder,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.aFormGroup = this.formBuilder.group({
      recaptcha: ['', Validators.required]
    });
  }

  bolbcheer(){
    console.log("aspartame")
  }

  onSubmit({value, valid}: {value: User, valid: boolean}) {

    if(!valid) {
      this.flashMessage.show('The form is not filled out correctly.',
      { cssClass: 'alert-danger', timeout: 4000});
    } 
    else {
      // Register new user
      this.authService.register(this.user.email , this.password)
      .then(res => {
        this.flashMessage.show('You are now registered. Please validate your email!', {
          cssClass: 'alert-success', timeout: 4000
        });
        // this.router.navigate(['/']);
        this.userService.newUser(value);
      })
      .catch(err => {
        this.flashMessage.show(err.message, {
          cssClass: 'alert-danger', timeout: 4000
        });
      });
    }
  }

  handleReset(): void {
    this.captchaSuccess = false;
    this.captchaResponse = undefined;
    this.captchaIsExpired = false;
  }

  handleSuccess(captchaResponse: string): void {
    this.captchaSuccess = true;
    this.captchaResponse = captchaResponse;
    this.captchaIsExpired = false;
  }

  handleLoad(): void {
    this.captchaIsLoaded = true;
    this.captchaIsExpired = false;
  }

  handleExpire(): void {
    this.captchaSuccess = false;
    this.captchaIsExpired = true;
  }

}
