import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-recaptcha',
  templateUrl: './recaptcha.component.html',
  styleUrls: ['./recaptcha.component.css']
})

export class RecaptchaComponent implements OnInit {

  public readonly siteKey = '6LcBoZ8UAAAAAPkSXt9Q09J45BRBuEBmjP_yxza1';
  public aFormGroup: FormGroup;
  public theme: 'light' | 'dark' = 'light';
  
  public captchaIsLoaded = false;
  public captchaSuccess = false;
  public captchaIsExpired = false;
  public captchaResponse?: string;

  constructor(
    private formBuilder: FormBuilder) {
     }

  ngOnInit() {
    this.aFormGroup = this.formBuilder.group({
      recaptcha: ['', Validators.required]
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
