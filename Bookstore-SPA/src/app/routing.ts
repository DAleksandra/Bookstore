import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { BooksComponent } from './books/books.component';
import { ProfileComponent } from './profile/profile.component';
import { FavouritesComponent } from './favourites/favourites.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { AboutUsComponent } from './about-us/about-us.component';

export const Routing: Routes = [
    {path: '', component: HomeComponent},
    {path: 'home', component: HomeComponent},
    {
        path: '',
        children: [
           
        ]
    },
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'books/:filter', component: BooksComponent},
    {path: 'profile', component: ProfileComponent},
    {path: 'favourites', component: FavouritesComponent},
    {path: 'shoppingcart', component: ShoppingCartComponent},
    {path: 'about', component: AboutUsComponent},
    {path: '**', redirectTo: '', pathMatch: 'full'}
]
