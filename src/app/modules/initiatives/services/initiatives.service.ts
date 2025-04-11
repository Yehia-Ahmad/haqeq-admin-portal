import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { removeNullishFieldsParams } from '../../../core/utilities/helper-function';

@Injectable({
  providedIn: 'root'
})
export class InitiativesService {
  baseUrl = environment.api_base_url;

  constructor(private _http: HttpClient) { }

  getAllInitiatives(params: any): Observable<any> {
    params = removeNullishFieldsParams(params);
    return this._http.get(`${this.baseUrl}admin/initiatives`, { params })
  }

  getSingleInitiatives(id: number): Observable<any> {
    return this._http.get(`${this.baseUrl}admin/initiatives/${id}`);
  }

  exportInitiativesData(): Observable<any> {
    return this._http.get(`${this.baseUrl}admin/initiatives/export/data`);
  }

  importInitiatives(formData: FormData): Observable<any> {
    return this._http.post(`${this.baseUrl}admin/initiatives/import`, formData);
  }

  addInitiatives(payload: FormData): Observable<any> {
    return this._http.post(`${this.baseUrl}admin/initiatives`, payload);
  }

  deleteInitiatives(id: number): Observable<any> {
    return this._http.delete(`${this.baseUrl}admin/initiatives/${id}`);
  }

  infinit(url, params: any): Observable<any> {
    return this._http.get(url, params);
  }
}
