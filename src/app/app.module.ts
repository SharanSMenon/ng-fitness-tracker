import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {WelcomeComponent} from './welcome/welcome.component';
import {AppRoutingModule} from './app-routing.module';
import {HeaderComponent} from './header/header.component';
import {LayoutModule} from '@angular/cdk/layout';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import {AuthModule} from './auth/auth/auth.module';
import {SharedModule} from './shared/shared/shared.module';
import {AngularFirestoreModule} from '@angular/fire/firestore';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    HeaderComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    AppRoutingModule,
    LayoutModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(environment.firebase),
    AuthModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
