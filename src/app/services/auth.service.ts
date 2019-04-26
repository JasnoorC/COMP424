import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs'; 
import { map } from 'rxjs/operators';
import { Router } from "@angular/router";
import { FlashMessagesService } from 'angular2-flash-messages';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private afAuth: AngularFireAuth,
    private flashMessage: FlashMessagesService,
    public router: Router,
    public ngZone: NgZone
    ) { }
  
  // login(email: string, password: string){
  //   return new Promise((resolve, reject) => {
  //     this.afAuth.auth.signInWithEmailAndPassword(email, password)
  //     .then(userData => resolve(userData), err => reject(err));
  //   });
  // }

  login(email: string, password: string){
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((result => {
        if (result.user.emailVerified !== true){
          this.sendVerificationMail();
          this.flashMessage.show('Please validate your email address!', {
            cssClass:'alert-danger', timeout: 4000
          });
        } 
        else {
          this.ngZone.run(() => {
            this.router.navigate(['/']);
            this.flashMessage.show('You are now logged in!', {
              cssClass:'alert-success', timeout: 4000
            });
          });
        }
      }))
  }

  getAuth(){
    return this.afAuth.authState.pipe(map(auth => auth));
  }

  logout(){
    this.afAuth.auth.signOut();
  }

  // register(email: string, password: string){
  //   return new Promise((resolve, reject) => {
  //     this.afAuth.auth.createUserWithEmailAndPassword(email, password)
  //     .then(userData => resolve(userData), err => reject(err));
  //   });
  // }

  register(email: string, password: string){
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.sendVerificationMail();
      }).catch(err => {
        this.flashMessage.show(err.message, {
          cssClass: 'alert-danger', timeout: 4000
        });
      })
  }

  sendVerificationMail(){
    return this.afAuth.auth.currentUser.sendEmailVerification()
    .then(() => {
      this.router.navigate(['login']);
    })
  }
}
