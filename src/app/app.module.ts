import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {ApartmentComponent} from './components/apartment/apartment.component';
import {SearchComponent} from './components/search/search.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {HeaderComponent} from './components/header/header.component';
import {UserComponent} from './components/user/user.component';
import {RegisterComponent} from './components/register/register.component';
import {LoginComponent} from './components/login/login.component';
import {RouterLink, RouterModule, Routes} from "@angular/router";
import {AuthInterceptor} from './services';
import {UserProfileComponent} from './components/user-profile/user-profile.component';
import {UserApartmentsComponent} from './components/user-apartments/user-apartments.component';
import {UserBookingsComponent} from './components/user-bookings/user-bookings.component';
import {ApartmentDetailsComponent} from './components/apartment-details/apartment-details.component';
import {AuthGuard} from "./guards/auth.guard";
import {ApartmentUpdateComponent} from './components/apartment-update/apartment-update.component';
import {ApartmentAddComponent} from './components/apartment-add/apartment-add.component';
import {NgxPaginationModule} from "ngx-pagination";
import {UserUpdateComponent} from './components/user-update/user-update.component';
import {UserApartmentDetailsComponent} from './components/user-apartment-details/user-apartment-details.component';
import {FooterComponent} from './components/footer/footer.component';
import { ReviewAddComponent } from './components/review-add/review-add.component';


const routes: Routes = [
  {path: '', component: SearchComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {
    path: 'user',
    component: UserComponent,
    children: [
      {path: '', redirectTo: 'profile', pathMatch: 'full'},
      {path: 'profile', component: UserProfileComponent},
      {path: 'update', component: UserUpdateComponent},
      {path: 'apartments', component: UserApartmentsComponent, pathMatch: 'full'},
      {path: 'apartments/new', component: ApartmentAddComponent, pathMatch: 'full'},
      {path: 'apartments/:id', component: UserApartmentDetailsComponent, pathMatch: 'full'},
      {path: 'bookings', component: UserBookingsComponent},
      {path: 'apartments/:id/update', component: ApartmentUpdateComponent, pathMatch: 'full'},
    ],
    canActivate: [AuthGuard],
  },
  {path: 'apartments/:id', component: ApartmentDetailsComponent, pathMatch: 'full'},
  {path: 'apartments/:id/add-review', component: ReviewAddComponent, pathMatch: 'full'},
  {path: '**', redirectTo: '', pathMatch: 'full'},
];


@NgModule({
  declarations: [
    AppComponent,
    ApartmentComponent,
    SearchComponent,
    HeaderComponent,
    UserComponent,
    RegisterComponent,
    LoginComponent,
    UserProfileComponent,
    UserApartmentsComponent,
    UserBookingsComponent,
    ApartmentDetailsComponent,
    ApartmentUpdateComponent,
    ApartmentAddComponent,
    UserUpdateComponent,
    UserApartmentDetailsComponent,
    FooterComponent,
    ReviewAddComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    RouterModule.forRoot(routes),
    NgxPaginationModule,
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
