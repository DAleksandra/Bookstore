import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routing } from './routing';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { BooksComponent } from './books/books.component';
import { ProfileComponent } from './profile/profile.component';
import { FavouritesComponent } from './favourites/favourites.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { Ng5SliderModule } from 'ng5-slider';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { ModalModule } from 'ngx-bootstrap/modal';
import { MatListModule } from '@angular/material/list';
import { BookDetailComponent } from './books/book-detail/book-detail.component';


@NgModule({
   declarations: [
      AppComponent,
      NavComponent,
      FooterComponent,
      LoginComponent,
      RegisterComponent,
      HomeComponent,
      BooksComponent,
      ProfileComponent,
      FavouritesComponent,
      ShoppingCartComponent,
      AboutUsComponent,
      BookDetailComponent
   ],
   imports: [
      BrowserModule,
      RouterModule.forRoot(Routing),
      FormsModule,
      ReactiveFormsModule,
      Ng5SliderModule,
      MDBBootstrapModule.forRoot(),
      HttpClientModule,
      BrowserAnimationsModule,
      BsDropdownModule.forRoot(),
      LayoutModule,
      ModalModule.forRoot()
      
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
