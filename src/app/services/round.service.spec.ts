/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RoundService } from './round.service';

describe('Service: Round', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RoundService]
    });
  });

  it('should ...', inject([RoundService], (service: RoundService) => {
    expect(service).toBeTruthy();
  }));
});
