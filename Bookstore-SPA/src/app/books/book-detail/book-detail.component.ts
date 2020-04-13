import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { BooksService } from 'src/app/_services/books.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from 'src/app/_models/book';
import { Filters } from 'src/app/_models/filters';
import { ShoppingCartService } from 'src/app/_services/shopping-cart.service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {
  modalRef: BsModalRef;
  book: Book;
  constructor(private modalService: BsModalService, private booksService: BooksService, private route: ActivatedRoute,
              private router: Router, private shoppingCartService: ShoppingCartService) { }

  ngOnInit() {
    
    const id: number = +this.route.snapshot.paramMap.get('id')
    this.booksService.getBook(id).subscribe(x => {
      this.book = x;
      this.book.inCart = 0;
    }, error => {
      console.log(error);
    });
    
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  return() {
    if(this.shoppingCartService.books.find(x => x.id === this.book.id)) {
      this.shoppingCartService.books[this.shoppingCartService.books.lastIndexOf(this.book)].inCart++;
    } else {
      this.book.inCart = +this.book.inCart + 1;
      this.shoppingCartService.books.push(this.book);
    }
  }

  goShoppingCard() {
    if(this.shoppingCartService.books.find(x => x.id === this.book.id)) {
      this.shoppingCartService.books[this.shoppingCartService.books.lastIndexOf(this.book)].inCart++;
    } else {
      this.book.inCart = +this.book.inCart + 1;
      this.shoppingCartService.books.push(this.book);
    }
    
    this.router.navigate(['shoppingcart']);
  }

  addToFavourite(id: number) {
    this.book.favourite = !this.book.favourite;
  }

}
