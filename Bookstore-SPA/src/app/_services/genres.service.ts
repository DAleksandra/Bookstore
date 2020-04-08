import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GenresService {
  items: string[] = [
    'All',
    'Action and adventure',
    'Crime and detective',
    'Fantasy',
    'Horror',
    'Romance',
  ];
  
constructor() { }

}
