import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Book } from '../_models/book';
import { Filters } from '../_models/filters';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
baseUrl: string = 'http://localhost:5000/api/books';
books: Book[];

constructor(private http: HttpClient) { }

getBooks(filters: Filters) {
  let params = new HttpParams();
  params = params.append('Genre', filters.genre);
  params = params.append('PriceMin', filters.priceMin.toString());
  params = params.append('PriceMax', filters.priceMax.toString());
  params = params.append('Sales', filters.sales.toString());
  params = params.append('SortBy', filters.sortBy);

  return this.http.get<Book[]>(this.baseUrl, { observe: 'response', params}).pipe(
    map(response => {
      this.books = response.body;
      return response.body;
    })
  );

}

getBook(id: number) {
  return this.http.get<Book>(this.baseUrl + '/' + id);
}

getBestsellers() {
  return this.http.get<Book[]>(this.baseUrl + '/bestsellers');
}

}
