import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../_services/shopping-cart.service';
import { BooksService } from '../_services/books.service';
import { Order } from '../_models/order';
import { Book } from '../_models/book';
import { GenresService } from '../_services/genres.service';
import { Options } from 'ng5-slider';
import { Filters } from '../_models/filters';
import { OrderBook } from '../_models/order-book';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  order = new Order();
  filter: string;
  status: string;
  filters: Filters = new Filters();
  orders: Order[];
  book = new Book();
  books: Book[];
  genres: string[];
  activateGenre: string;
  value: number = 0;
  sales: boolean = false;
  loaded: boolean = false;
  highValue: number = 100;
  sortOption: string;
  viewOrder: boolean = false;
  bookEdit: boolean = false;
  bookNew: boolean = false;
  options: Options = {
    floor: 0,
    ceil: 100
  };
  router: any;

  constructor(private shoppingCartService: ShoppingCartService, private bookService: BooksService,
              private genresService: GenresService) { }

  ngOnInit() {
    this.activateGenre = 'All';
    this.status='All';
    this.getOrders();
    this.reloadBooks();
    
    
  }

  getOrders() {
    this.shoppingCartService.getOrdersWorker(this.status).subscribe(x => {
      this.orders = x.body;
    }, error => {
      console.log(error);
    });
    this.genres = this.genresService.items;

  
  }

  sortByStatus() {
    this.getOrders();
  }


  viewOrderOn(order: Order) {
    const i = order.books.length;
    this.order = order;
    for (let a = 0; a < i; a++) {
      this.bookService.getBook(order.books[a].bookId).subscribe(x => {
        this.order.books[a].book = x;
      }, error => {
        console.log(error);
      });
    }

    this.viewOrder = true;
  }

  viewBookOn(book: Book) {
    this.book = book;
    this.bookEdit = true;

  }

  addNewBook() {
    this.bookNew = true
  }



  onLeaveOrder(leave: boolean) {
    this.getOrders();
    this.viewOrder = false;

  }

  onLeaveBook() {
    this.bookEdit = false;
    this.bookNew = false;
    this.reloadBooks();
  }

  filterBooks() {
    this.reloadBooks();
  }

  reloadBooks () {
    this.loaded = false;
    this.filters.genre = this.activateGenre;
    this.filters.priceMin = this.value;
    this.filters.sortBy = this.sortOption;
    this.filters.priceMax = this.highValue;
    this.filters.sales = this.sales;
  
    this.bookService.getBooks(this.filters).subscribe((x: Book[]) => {
      this.books = x;
      this.loaded = true;
    }, error => {
      console.log(error);
    }
    );
  }

  onSort() {
    this.reloadBooks();
 }

 goToDetail(id: number) {

 }

 changeGenre(genre: string) {
  this.activateGenre = genre;
  this.router.navigate(['/books/', this.activateGenre]);

}

}
