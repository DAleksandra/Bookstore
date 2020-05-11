import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FavouriteBook } from '../_models/favourite-book';
import { AuthService } from './auth.service';
import { Book } from '../_models/book';

@Injectable({
  providedIn: 'root'
})
export class FavouritesService {
baseUrl: string = 'http://localhost:5000/api';
favouriteBooks: FavouriteBook[];

constructor(private http: HttpClient, private authService: AuthService) { }

getFavourites() {
  return this.http.get<FavouriteBook[]>(this.baseUrl + '/' + this.authService.decodedToken.nameid + '/favourite');
}

deleteFavourite(id: number) {
  return this.http.delete(this.baseUrl + '/' + this.authService.decodedToken.nameid + '/favourite/' + id);
}

addFavourite(favId: number, favBook: Book) {
  return this.http.post(this.baseUrl + '/' + this.authService.decodedToken.nameid + '/favourite', {BookId: favId, Book: favBook });
}

}