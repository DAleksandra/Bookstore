import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routing } from './routing';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { MDBBootstrapModule, TooltipModule } from 'angular-bootstrap-md';

import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { JwtModule } from '@auth0/angular-jwt';
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
import { ModalModule } from 'ngx-bootstrap/modal';
import { BookDetailComponent } from './books/book-detail/book-detail.component';
import { AuthService } from './_services/auth.service';
import { OrderFinalizeComponent } from './shopping-cart/order-finalize/order-finalize.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { ShippingComponent } from './shipping/shipping.component';
import { RegulationsComponent } from './regulations/regulations.component';
import { ClickOutsideModule } from 'ng-click-outside';
import { AdminComponent } from './admin/admin.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { WorkerComponent } from './worker/worker.component';
import { EditOrderComponent } from './admin/edit-order/edit-order.component';
import { NewBookComponent } from './admin/new-book/new-book.component';
import { EditBookComponent } from './admin/edit-book/edit-book.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

export function tokenGetter() {
   return localStorage.getItem('token');
}


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
      BookDetailComponent,
      OrderFinalizeComponent,
      ShippingComponent,
      RegulationsComponent,
      AdminComponent,
      WorkerComponent,
      EditOrderComponent,
      EditBookComponent,
      NewBookComponent
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
      BsDatepickerModule.forRoot(),
      ClickOutsideModule,
      TabsModule.forRoot(),
      CarouselModule.forRoot(),
      ProgressbarModule.forRoot(),
      ModalModule.forRoot(),
      TooltipModule.forRoot(),
      TypeaheadModule.forRoot(),
      JwtModule.forRoot({
         config: {
            tokenGetter: tokenGetter,
            whitelistedDomains: ['localhost:5000'],
            blacklistedRoutes: ['localhost:5000/api/auth']
         }
      })
   ],
   providers: [AuthService],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }