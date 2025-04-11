import { HttpInterceptorFn } from '@angular/common/http';
import { DiskService } from '../../modules/shared/services/disk.service';
import { inject } from '@angular/core';

export const httpconfigInterceptor: HttpInterceptorFn = (req, next) => {
  const _diskService = inject(DiskService);
  const access_token = _diskService.accessToken;
  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  return next(authReq);
};