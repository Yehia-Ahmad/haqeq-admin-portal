import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { removeNullishFieldsParams } from '../../../core/utilities/helper-function';

@Injectable({
  providedIn: 'root'
})
export class LibService {
  baseUrl = environment.api_base_url;

  constructor(private _http: HttpClient) { }

  getAllLibraries(params: any): Observable<any> {
    params = removeNullishFieldsParams(params);
    return this._http.get(`${this.baseUrl}admin/libraries`, { params })
  }

  getLibrary(id: number): Observable<any> {
    return this._http.get(`${this.baseUrl}admin/libraries/${id}`);
  }

  exportLibrariesData(): Observable<any> {
    return this._http.get(`${this.baseUrl}admin/libraries/export/data`);
  }

  importLibraries(formData: FormData): Observable<any> {
    return this._http.post(`${this.baseUrl}admin/libraries/import`, formData);
  }

  addLibraries(payload: FormData): Observable<any> {
    return this._http.post(`${this.baseUrl}admin/libraries`, payload);
  }

  deleteLibrary(id: number): Observable<any> {
    return this._http.delete(`${this.baseUrl}admin/libraries/${id}`);
  }
}

