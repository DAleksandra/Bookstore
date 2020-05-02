import { Component, OnInit } from '@angular/core';
import { CarouselConfig } from 'ngx-bootstrap/carousel';
import { BooksService } from '../_services/books.service';
import { Book } from '../_models/book';
import { Router } from '@angular/router';

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
  constructor(private booksService: BooksService, private router: Router) { }

  ngOnInit() {
    this.booksService.getBestsellers().subscribe(x => {
      this.books = x;
      console.log(this.books);
    }, error => {
      console.log(error);
    });
  }

  goToDetail(id: number) {
    this.router.navigate(['/book/', id]);
  }

}
