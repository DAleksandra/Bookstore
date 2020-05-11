import { Component, OnInit } from '@angular/core';
import { Book } from '../_models/book';
import { FavouritesService } from '../_services/favourites.service';
import { BooksService } from '../_services/books.service';
import { AlertifyService } from '../_services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent implements OnInit {
  books: Book[] = [];

  constructor(private favouritesService: FavouritesService, private booksService: BooksService,
              private alertify: AlertifyService, private router: Router) { }

  ngOnInit() {
    this.favouritesService.getFavourites().subscribe(x => {
      this.favouritesService.favouriteBooks = x;
      this.favouritesService.favouriteBooks.forEach(a => {
       this.booksService.getBook(a.bookId).subscribe(i => {
         i.favourite = true;
         this.books.push(i);
         console.log(this.books);
       });
      });
    });
  }

  addToFavourite(book: Book) {
      this.favouritesService.deleteFavourite(book.id).subscribe(x => {
        this.alertify.error("Favourite deleted.");
      }, error => {
       this.alertify.error("Cannot delete favourite");
    });
   }

   goToDetail(id: number) {
    this.router.navigate(['/book/', id]);
  }
}
