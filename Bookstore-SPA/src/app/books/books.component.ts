import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { GenresService } from '../_services/genres.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  filter: string;
  genres: string[];
  activateGenre: string;

  constructor(private route: ActivatedRoute, private genresService: GenresService, private router: Router) { 
  }

  ngOnInit() {
    this.genres = this.genresService.items;

    this.route.params.forEach((params: Params) => {
      this.activateGenre = params['filter']
  });
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

}
