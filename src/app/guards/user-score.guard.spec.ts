import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { userScoreGuard } from './user-score.guard';

describe('userScoreGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => userScoreGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
