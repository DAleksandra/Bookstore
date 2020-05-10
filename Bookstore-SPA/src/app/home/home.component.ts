import { Component, OnInit } from '@angular/core';
import { CarouselConfig } from 'ngx-bootstrap/carousel';
import { BooksService } from '../_services/books.service';
import { Book } from '../_models/book';
import { Router } from '@angular/router';
import { Banner } from '../_models/banner';
import { ShoppingCartService } from '../_services/shopping-cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [
    { provide: CarouselConfig, useValue: { interval: 9000, noPause: true, showIndicators: true } }
  ]
})
export class HomeComponent implements OnInit {
  books: Book[];
  banners: Banner[];
  constructor(private booksService: BooksService, private router: Router, private shoppingCartService: ShoppingCartService) { }

  ngOnInit() {
    this.booksService.getBestsellers().subscribe(x => {
      this.books = x;
      this.shoppingCartService.getBanners().subscribe(x => {
        this.banners = x;
      });
    }, error => {
      console.log(error);
    });
  }

  onBannerClick(id: number) {
    this.router.navigate([this.banners[id - 1].query]);
  }

  goToDetail(id: number) {
    this.router.navigate(['/book/', id]);
  }

}
