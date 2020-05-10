import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Book } from 'src/app/_models/book';
import { GenresService } from 'src/app/_services/genres.service';
import { BooksService } from 'src/app/_services/books.service';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Component({
  selector: 'app-new-book',
  templateUrl: './new-book.component.html',
  styleUrls: ['./new-book.component.css']
})
export class NewBookComponent implements OnInit {
  @Output() leave = new EventEmitter();
  book = new Book();
  genres: string[];
  constructor(private genresService: GenresService, private bookService: BooksService, private alertify: AlertifyService) { }

  ngOnInit() {
    this.genres = this.genresService.items;
    this.book.genre = 'Fantasy';
  }

  leaveBook() {
    this.leave.emit('true');
  }

  newBook() {
    this.bookService.addBook(this.book).subscribe(x => {
      this.alertify.success("Successfully added.");
      this.leave.emit('true');
    }, error => {
      this.alertify.error("Cannot add book");
    });
  }



}
