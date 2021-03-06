import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;

  public readonly siteKey = '6LcBoZ8UAAAAAPkSXt9Q09J45BRBuEBmjP_yxza1';
  public aFormGroup: FormGroup;
  public theme: 'light' | 'dark' = 'light';
  
  public captchaIsLoaded = false;
  public captchaSuccess = false;
  public captchaIsExpired = false;
  public captchaResponse?: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService,
    private formBuilder: FormBuilder
    ) { }

  ngOnInit() {
    this.authService.getAuth().subscribe(auth => {
      if(auth) {
        this.router.navigate(['/']);
      }
    });

    this.aFormGroup = this.formBuilder.group({
      recaptcha: ['', Validators.required]
    });
  }

  onSubmit(){
    this.authService.login(this.email, this.password)
    .then(res => {
      // this.flashMessage.show('You are now logged in', {
      //   cssClass:'alert-success', timeout: 4000
      // });
      // this.router.navigate(['/']);
    })
    .catch(err => {
      this.flashMessage.show(err.message, {
        cssClass: 'alert-danger', timeout: 4000
      });
    });
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
