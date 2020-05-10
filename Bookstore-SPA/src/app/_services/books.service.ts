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
bookName: string = '';

constructor(private http: HttpClient) { }

getBooks(filters: Filters) {
  let params = new HttpParams();
  params = params.append('Genre', filters.genre);
  params = params.append('PriceMin', filters.priceMin.toString());
  params = params.append('PriceMax', filters.priceMax.toString());
  params = params.append('Sales', filters.sales.toString());
  params = params.append('SortBy', filters.sortBy);
  params = params.append('BookName', this.bookName);

  return this.http.get<Book[]>(this.baseUrl, { observe: 'response', params}).pipe(
    map(response => {
      this.books = response.body;
      this.bookName = '';
      return response.body;
    })
  );

}

getBook(id: number) {
  return this.http.get<Book>(this.baseUrl + '/' + id);
}

updateBook(book: Book)
{
  return this.http.put(this.baseUrl + '/' + book.id, book);
}

deleteBook(id: number) {
  return this.http.delete(this.baseUrl + '/' + id);
}

addBook(book: Book) {
  return this.http.post(this.baseUrl, {Title: book.title, Author: book.author, Description: book.description, PhotoUrl: book.photoUrl,
                        Stock: book.stock, Saled: book.saled, Price: book.price, OnSale: book.onSale, SalePrice: book.salePrice,
                        Language: book.language, Publisher: book.publisher, Genre: book.genre, PublishingDate: book.publishingDate});
}

getBestsellers() {
  return this.http.get<Book[]>(this.baseUrl + '/bestsellers');
}

getSearchedBooks(filter: string) {
  let params = new HttpParams();
  params = params.append('bookName', filter);
  return this.http.get<Book[]>(this.baseUrl + '/search', { observe: 'response', params}).pipe(
    map(response => {
      this.books = response.body;
      this.bookName = '';
      return response.body;
    })
  );
}

}
