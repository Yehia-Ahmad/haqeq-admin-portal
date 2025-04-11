import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = environment.api_base_url;
  is_User_LoggedIn:Subject<boolean> = new Subject<boolean>();
  constructor(private http: HttpClient) { }

  login(payload): Observable<any> {
    return this.http.post(this.baseUrl + 'auth/admin/login', payload );
  }

  logout() {
    this.is_User_LoggedIn.next(false);
    localStorage.clear();
  }
}
