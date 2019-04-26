import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { DownloadFileComponent } from './components/download-file/download-file.component';
import { AuthGuard } from './guards/auth.guard';
import { RegisterGuard } from './guards/register.guard';


const routes: Routes = [
  {path: '', component: DashboardComponent, canActivate:[AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent, canActivate:[RegisterGuard]},
  {path: 'download', component: DownloadFileComponent, canActivate:[AuthGuard]},
  {path: '**', component: NotFoundComponent, canActivate:[AuthGuard]},
];

@NgModule({
  exports: [RouterModule],
  imports: [
    RouterModule.forRoot(routes)
  ],
  providers:[AuthGuard, RegisterGuard] 
})
export class AppRoutingModule { }
