
import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { DiskService } from '../../modules/shared/services/disk.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const _diskService = inject(DiskService);
  const access_token = _diskService.accessToken;

  if (access_token) {
    // User is logged in, allow access to the route
    return true;
  } else {
    // User is not logged in, redirect to the login page
    router.navigate(['/login']);
    return false;
  }
};
