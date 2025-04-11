import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DiskService {
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  set accessToken(token: string) {
    if (this.isBrowser) {
      localStorage.setItem('access_token', token);
    }
  }

  get accessToken() {
    if (this.isBrowser) {
      return localStorage.getItem('access_token');
    }
    return null;
  }

  set user(user: any) {
    if (this.isBrowser) {
      localStorage.setItem('userProfile', JSON.stringify(user));
    }
  }

  get user() {
    if (this.isBrowser) {
      return JSON.parse(localStorage.getItem('userProfile'));
    }
    return null;
  }

  removeToken() {
    if (this.isBrowser) {
      localStorage.removeItem('access_token');
    }
  }
}