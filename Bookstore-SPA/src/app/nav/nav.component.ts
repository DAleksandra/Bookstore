import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';
import { BooksService } from '../_services/books.service';
import { Book } from '../_models/book';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  bookName: string;
  books: Book[];
  inputActive: boolean = false;

  constructor(private authService: AuthService, private router: Router, private alertify: AlertifyService,
              private booksService: BooksService) { }

  items: string[] = [
    'All',
    'Action and adventure',
    'Crime and detective',
    'Fantasy',
    'Horror',
    'Romance',
  ];

  ngOnInit() {
    this.bookName = '';
  }

  userProfile() {
    if(this.authService.loggedIn() === true)
    {
      
    }
    else {
      this.router.navigate(['/login']);
    }
  }

  logged() {
    return this.authService.loggedIn();
  }

  logged2() {
    return !this.authService.loggedIn();
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['']);
    this.alertify.message('logged out');
  }

  onKey(event: any) {
    this.bookName = event.target.value;
    this.booksService.getSearchedBooks(this.bookName).subscribe(x => {
      this.books = x;
    });
  }

  onSearch() {
    if(!(this.bookName === ''))
    {
      this.booksService.bookName = this.bookName;
      this.bookName = '';
      this.router.navigate(['books/All']);
    }
  }

  onFocus() {
    this.inputActive = true;
  }

  onBlur() {
    
    this.inputActive = false;
  }

  chooseBook(id: number) {
    console.log(id);
    this.bookName = '';
    this.router.navigate(['book/' + id]);
  }

}
