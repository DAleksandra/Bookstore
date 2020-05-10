import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Book } from 'src/app/_models/book';
import { GenresService } from 'src/app/_services/genres.service';
import { BooksService } from 'src/app/_services/books.service';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit {
  @Input() book: Book;
  @Output() leave = new EventEmitter();
  genres: string[];
  constructor(private genresService: GenresService, private booksService: BooksService, private alertify: AlertifyService) { }

  ngOnInit() {
    this.genres = this.genresService.items;
  }

  leaveBook() {
    this.leave.emit('true');
  }

  editBook() {
    this.booksService.updateBook(this.book).subscribe(x => {
      this.alertify.success("Successfully updated book.");
      this.leave.emit('true');
    }, error => {
      this.alertify.error("Cannot update book.");
    });
  }

  deleteBook() {
    this.booksService.deleteBook(this.book.id).subscribe(x => {
      this.alertify.success("Successfully deleted book.");
      this.leave.emit('true');
    }, error => {
      this.alertify.error("Cannot delete book.");
    });
  }

}
