import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../_services/shopping-cart.service';
import { Book } from '../_models/book';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  books: Book[];
  total: number = 0;
  subtotal: number = 0;
  taxes: number;
  taxesMoney: number;
  shipping: number;
  

  constructor(private shoppingCartService: ShoppingCartService) { }

  ngOnInit() {
    this.shipping = this.shoppingCartService.shipping;
    this.taxes = this.shoppingCartService.taxes;
    this.books = this.shoppingCartService.books;

    this.recalculate();
  }

  addQty(book: Book) {
    this.books.find(x => x.id === book.id).inCart++;
    this.recalculate();
  }

  minusQty(book: Book) {
    if (this.books.find(x => x.id === book.id).inCart === 1) {
      this.books.slice(this.books.lastIndexOf(book), this.books.lastIndexOf(book));
    }
    this.books.find(x => x.id === book.id).inCart--;
    this.recalculate();
  }

  recalculate() {
    this.subtotal = 0;
    for (let el of this.books) {
      this.subtotal = this.subtotal + el.price * el.inCart;
    }
    this.total = this.subtotal + this.subtotal * this.taxes/100 + this.shipping;
    this.taxesMoney = this.subtotal * this.taxes/100;
  }

}
