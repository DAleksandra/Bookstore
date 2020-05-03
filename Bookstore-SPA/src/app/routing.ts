import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { BooksComponent } from './books/books.component';
import { ProfileComponent } from './profile/profile.component';
import { FavouritesComponent } from './favourites/favourites.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { BookDetailComponent } from './books/book-detail/book-detail.component';
import { OrderFinalizeComponent } from './shopping-cart/order-finalize/order-finalize.component';
import { ShippingComponent } from './shipping/shipping.component';
import { RegulationsComponent } from './regulations/regulations.component';
import { Auth } from './_guards/auth.guard';

export const Routing: Routes = [
    {path: '', component: HomeComponent},
    {path: 'home', component: HomeComponent},
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [Auth],
        children: [
            {path: 'finalize', component: OrderFinalizeComponent},
            {path: 'profile', component: ProfileComponent},
            {path: 'favourites', component: FavouritesComponent},
        ]
    },
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'books/:filter', component: BooksComponent},
    {path: 'book/:id', component: BookDetailComponent},
    {path: 'shoppingcart', component: ShoppingCartComponent},
    {path: 'about', component: AboutUsComponent},
    {path: 'shipping', component: ShippingComponent},
    {path: 'regulations', component: RegulationsComponent},
    {path: '**', redirectTo: '', pathMatch: 'full'}
]
