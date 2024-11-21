import { TestBed } from '@angular/core/testing';

import { WineserService } from './wineser.service';

describe('WineserService', () => {
  let service: WineserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WineserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
