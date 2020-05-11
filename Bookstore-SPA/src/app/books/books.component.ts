import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { GenresService } from '../_services/genres.service';
import { Options, LabelType } from 'ng5-slider';
import { Book } from '../_models/book';
import { BooksService } from '../_services/books.service';
import { Filters } from '../_models/filters';
import { ShoppingCartComponent } from '../shopping-cart/shopping-cart.component';
import { ShoppingCartService } from '../_services/shopping-cart.service';
import { FavouritesService } from '../_services/favourites.service';
import { AlertifyService } from '../_services/alertify.service';

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
  value = 0;
  highValue = 100;
  sales = false;
  sortOption: string;
  filters: Filters = new Filters();
  loaded = false;

  options: Options = {
    floor: 0,
    ceil: 100
  };


  constructor(private route: ActivatedRoute, private genresService: GenresService, private router: Router,
              private booksService: BooksService, private shoppingCart: ShoppingCartService, private favouritesService: FavouritesService,
              private alertify: AlertifyService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.route.params.forEach((params: Params) => {
        this.activateGenre = params.filter;
        this.filters.priceMin = this.value;
        this.filters.priceMax = this.highValue;
        this.filters.genre = this.activateGenre;
        this.filters.sortBy = this.sortOption;
        this.filters.sales = this.sales;
        this.genres = this.genresService.items;
        this.reloadBooks();
        this.loadFavourite();
    });
    
  });

  }

  changeGenre(genre: string) {
    this.activateGenre = genre;
    this.router.navigate(['/books/', this.activateGenre]);

  }

  isDisabled(genre: string) {
    if (genre === this.activateGenre) {
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

 reloadBooks() {
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

 addToFavourite(book: Book) {
   console.log(book.id);
   if(book.favourite === false) {
    this.favouritesService.addFavourite(book.id, book).subscribe(x => {
      this.alertify.success("Added to favourites");
      this.loadFavourite();
    }, error => {
      this.alertify.error("Cannot add to favourite");
    });
   }
   else {
     this.favouritesService.deleteFavourite(book.id).subscribe(x => {
       this.alertify.error("Favourite deleted.");
       this.loadFavourite();
     }, error => {
      this.alertify.error("Cannot delete favourite");
   });
  }
 }

 loadFavourite() {
   this.favouritesService.getFavourites().subscribe(x => {
     this.favouritesService.favouriteBooks = x;
     this.books.forEach(x => {
       x.favourite = false;
      this.favouritesService.favouriteBooks.forEach(a => {
        if(a.bookId === x.id) {
          x.favourite = true;
        }
      });
     });
   });
 }

}
