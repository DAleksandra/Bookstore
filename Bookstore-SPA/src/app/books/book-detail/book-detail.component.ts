import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { BooksService } from 'src/app/_services/books.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from 'src/app/_models/book';
import { ShoppingCartService } from 'src/app/_services/shopping-cart.service';
import { FavouritesService } from 'src/app/_services/favourites.service';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {
  modalRef: BsModalRef;
  book: Book;
  books: Book[];

  constructor(private modalService: BsModalService, private booksService: BooksService, private route: ActivatedRoute,
              private router: Router, private shoppingCartService: ShoppingCartService, private favouritesService: FavouritesService,
              private alertify: AlertifyService) { 
              }

  ngOnInit() {
    
    this.route.params.subscribe(params => {
      const id: number = +this.route.snapshot.paramMap.get('id');
    this.reloadBook(id);
    });    
  }

  

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  return() {
    if(this.shoppingCartService.orderBooks.find(x => x.book.id === this.book.id)) {
      this.shoppingCartService.orderBooks.find(x => x.book.id === this.book.id).quantity++;
    } else {
      this.shoppingCartService.orderBooks.push({book: this.book, bookId: this.book.id, quantity: 1 });
    }
    
  }

  goShoppingCard() {
    if(this.shoppingCartService.orderBooks.find(x => x.book.id === this.book.id)) {
      this.shoppingCartService.orderBooks.find(x => x.book.id === this.book.id).quantity++;
    } else {
      this.shoppingCartService.orderBooks.push({book: this.book, bookId: this.book.id, quantity: 1 });
    }
    
    this.router.navigate(['shoppingcart']);
  }



  goToDetail(id: number) {
    this.router.navigate(['/book/', id]);
    this.reloadBook(id);
    this.loadFavourite();
  }

  reloadBook(id: number) {
    this.booksService.getBook(id).subscribe(x => {
      this.book = x;
      this.book.inCart = 0;
      this.loadFavourite();
    }, error => {
      console.log(error);
    });

    this.booksService.getBestsellers().subscribe(x => {
      this.books = x;
    }, error => {
      console.log(error);
    });
  }

  addToFavourite() {
    if(this.book.favourite === false) {
     this.favouritesService.addFavourite(this.book.id, this.book).subscribe(x => {
       this.alertify.success("Added to favourites");
       this.loadFavourite();
     }, error => {
       this.alertify.error("Cannot add to favourites");
     });
    }
    else {
      this.favouritesService.deleteFavourite(this.book.id).subscribe(x => {
        this.alertify.error("Favourite deleted.");
        this.loadFavourite();
      }, error => {
       this.alertify.error("Cannot delete favourite");
    });
   }
  }
 
  loadFavourite() {
    this.favouritesService.getFavourites().subscribe(x => {
      this.book.favourite = false;
      this.favouritesService.favouriteBooks = x;
      this.favouritesService.favouriteBooks.forEach(a => {
        if(a.bookId === this.book.id) {
          this.book.favourite = true;
        }
      });
    });
  }
 

}
