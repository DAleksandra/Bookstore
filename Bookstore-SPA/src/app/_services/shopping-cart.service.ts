import { Injectable } from '@angular/core';
import { Book } from '../_models/book';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
books: Book[] = [];
total: number;
taxes: number = 12;
shipping: number = 15;

constructor() {
 }

}
