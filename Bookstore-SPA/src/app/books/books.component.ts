import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { GenresService } from '../_services/genres.service';
import { Options, LabelType } from 'ng5-slider';
import { Book } from '../_models/book';
import { BooksService } from '../_services/books.service';
import { Filters } from '../_models/filters';
import { ShoppingCartComponent } from '../shopping-cart/shopping-cart.component';
import { ShoppingCartService } from '../_services/shopping-cart.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  filter: string;
  genres: string[];
  books: Book[];
  activateGenre: string;
  value: number = 0;
  highValue: number = 100;
  sales: boolean = false;
  sortOption: string;
  filters: Filters = new Filters();
  loaded: boolean = false;
 
  options: Options = {
    floor: 0,
    ceil: 100
  };
  

  constructor(private route: ActivatedRoute, private genresService: GenresService, private router: Router,
              private booksService: BooksService, private shoppingCart: ShoppingCartService) { 
  }

  ngOnInit() {

    this.route.params.forEach((params: Params) => {
    this.activateGenre = params['filter']
  });

    this.filters.priceMin = this.value;
    this.filters.priceMax = this.highValue;
    this.filters.genre = this.activateGenre;
    this.filters.sortBy = this.sortOption;
    this.filters.sales = this.sales;
    this.genres = this.genresService.items;
    this.reloadBooks();
  }

  changeGenre(genre: string) {
    this.activateGenre = genre;
    this.router.navigate(['/books/', this.activateGenre]);

  }

  isDisabled(genre: string) {
    if(genre === this.activateGenre) {
      return false;
    }

    return true;
  }

  filterBooks() {
    this.reloadBooks();
  }

  goToDetail(id: number) {
    this.router.navigate(['/book/', id]);
  }

 onSort() {
    this.reloadBooks();
 }

 reloadBooks () {
   this.loaded = false;
  
  this.filters.genre = this.activateGenre;
  this.filters.priceMin = this.value;
  this.filters.priceMax = this.highValue;
  this.filters.sortBy = this.sortOption;
  this.filters.sales = this.sales;

  this.booksService.getBooks(this.filters).subscribe((x: Book[]) => {
    this.books = x;
    this.loaded = true;
  }, error => {
    console.log(error);
  }
  );
 }

}
