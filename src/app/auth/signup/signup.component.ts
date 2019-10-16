import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from '../auth.service';
import {Subscription} from 'rxjs';
import {UiService} from '../../shared/ui.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {
  isLoading = false;
  loadSub: Subscription;
  constructor(
    private authService: AuthService,
    private uiService: UiService
  ) {
  }

  ngOnInit() {
    this.loadSub = this.uiService.loadingStateChanged.subscribe(state => {
      this.isLoading = state;
    })
  }
  loginGoogle() {
    this.authService.loginGoogle();
  }
  onSubmit(form: NgForm) {
    this.authService.registerUser({
      email: form.value.email,
      password: form.value.password
    });
  }
  ngOnDestroy(): void {
    this.loadSub.unsubscribe();
  }

}
