import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FlashMessagesModule } from 'angular2-flash-messages';

import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthService } from "./services/auth.service";
import { HomepageComponent } from './components/homepage/homepage.component';
import { DownloadFileComponent } from './components/download-file/download-file.component';
import { SettingsService } from './services/settings.service';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxCaptchaModule } from 'ngx-captcha';
import { RecaptchaComponent } from './components/recaptcha/recaptcha.component';
import { UserService } from './services/user.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DashboardComponent,
    SidebarComponent,
    LoginComponent,
    RegisterComponent,
    NotFoundComponent,
    HomepageComponent,
    DownloadFileComponent,
    RecaptchaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase, 'clientpanel'),
    AngularFirestoreModule,
    AngularFireAuthModule,
    FormsModule,
    FlashMessagesModule.forRoot(),
    ReactiveFormsModule,
    NgxCaptchaModule
  ],
  providers: [AuthService, SettingsService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
