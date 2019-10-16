import {Component, OnDestroy, OnInit} from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import {Observable, Subscription} from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import {AuthService} from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuth: boolean;
  authSubscription: Subscription;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, private authService: AuthService) {}

  ngOnInit(): void {
    this.authSubscription = this.authService.authChanged.subscribe((authStatus) => {
      this.isAuth = authStatus;
    });
  }
  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }
  onLogout() {
    this.authService.logout();
  }
}
