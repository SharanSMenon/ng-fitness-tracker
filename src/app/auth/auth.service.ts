import {Injectable} from '@angular/core';
import {User} from './user.model';
import {AuthData} from './auth-data.model';
import {Subject} from 'rxjs';
import {Router} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';
import {TrainingService} from '../training/training.service';
import {UserIdService} from '../user-id.service';
import {MatSnackBar} from '@angular/material';
import {UiService} from '../shared/ui.service';
import * as firebase from 'firebase/app';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // tslint:disable-next-line:variable-name
  authChanged = new Subject<boolean>();
  private isAuthenticated = false;

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private trainingService: TrainingService,
    private userIdService: UserIdService,
    private snackBar: MatSnackBar,
    private uiService: UiService
  ) {
  }

  initAuthListener() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.authChanged.next(true);
        this.isAuthenticated = true;
        this.router.navigate(['/training']);
        const userJson = user.toJSON();
        this.userIdService.userId = userJson['uid'];
      } else {
        this.trainingService.cancelSubscriptions();
        this.authChanged.next(false);
        this.router.navigate(['/login']);
        this.isAuthenticated = false;
      }
    });
  }

  registerUser(authData: AuthData) {
    this.uiService.loadingStateChanged.next(true);
    this.afAuth.auth.createUserWithEmailAndPassword(authData.email, authData.password)
      .then(res => {
        this.uiService.loadingStateChanged.next(false);
      }).catch(err => {
      this.uiService.loadingStateChanged.next(false);
      this.uiService.showSnackbar(err.message, null, 3000);
    });
  }
  loginGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    this.afAuth.auth.signInWithPopup(provider);
  }
  login(authData: AuthData) {
    this.uiService.loadingStateChanged.next(true);
    this.afAuth.auth.signInWithEmailAndPassword(authData.email, authData.password)
      .then(res => {
        this.uiService.loadingStateChanged.next(false);
      })
      .catch((err) => {
        this.uiService.loadingStateChanged.next(false);
        this.uiService.showSnackbar(err.message, null, 3000);
      });
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  isAuth() {
    return this.isAuthenticated;
  }
}
