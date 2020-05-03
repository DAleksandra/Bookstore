import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../_services/shopping-cart.service';
import { Book } from '../_models/book';
import { OrderBook } from '../_models/order-book';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  orderBooks: OrderBook[];
  books: Book[];
  total: number = 0;
  subtotal: number = 0;
  taxes: number;
  taxesMoney: number;
  shipping: number;
  

  constructor(private shoppingCartService: ShoppingCartService, private router: Router,
              private authService: AuthService, private alertify: AlertifyService) { }

  ngOnInit() {
    this.shipping = this.shoppingCartService.shipping;
    this.taxes = this.shoppingCartService.taxes;
    this.orderBooks = this.shoppingCartService.orderBooks;

    this.recalculate();
  }

  addQty(orderBook: OrderBook) {
    this.orderBooks.find(x => x.book.id === orderBook.book.id).quantity++;
    //this.books.find(x => x.id === book.id).inCart++;
    this.recalculate();
  }

  minusQty(orderBook: OrderBook) {
    console.log(this.orderBooks);
    if (this.orderBooks.find(x => x.book.id === orderBook.book.id).quantity === 1) {
      this.orderBooks.splice(this.orderBooks.lastIndexOf(orderBook), this.orderBooks.lastIndexOf(orderBook)+1);
      }
    
    this.recalculate();
  }

  recalculate() {
    this.subtotal = 0;
    for (let el of this.orderBooks) {
      this.subtotal = this.subtotal + el.book.price * el.quantity;
    }
    this.total = this.subtotal + this.subtotal * this.taxes/100 + this.shipping;
    this.taxesMoney = this.subtotal * this.taxes/100;

    this.shoppingCartService.orderBooks = this.orderBooks;
    this.shoppingCartService.total = this.total;
  }

  remove(orderBook: OrderBook) {
    this.orderBooks.find(x => x.book.id === orderBook.book.id).quantity = 1; 
    if (this.orderBooks.find(x => x.book.id === orderBook.book.id).quantity === 1) {
      this.orderBooks.splice(this.orderBooks.lastIndexOf(orderBook), this.orderBooks.lastIndexOf(orderBook)+1);
    }

      this.recalculate();
  }

  order() {
      this.router.navigate(['finalize']);
  }

}
