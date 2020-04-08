/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GenresService } from './genres.service';

describe('Service: Genres', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GenresService]
    });
  });

  it('should ...', inject([GenresService], (service: GenresService) => {
    expect(service).toBeTruthy();
  }));
});
