import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../auth.service';
import {NgForm} from '@angular/forms';
import {UiService} from '../../shared/ui.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  isLoading = false;
  loadSub: Subscription;
  constructor(
    private authService: AuthService,
    private uiService: UiService
  ) { }

  onSubmit(form: NgForm) {
    this.authService.login({
      email: form.value.email,
      password: form.value.password
    });
  }
  loginWithGoogle() {
    this.authService.loginGoogle();
  }
  ngOnInit() {
    this.loadSub = this.uiService.loadingStateChanged.subscribe(state => {
      this.isLoading = state;
    })
  }

  ngOnDestroy(): void {
    this.loadSub.unsubscribe();
  }

}
