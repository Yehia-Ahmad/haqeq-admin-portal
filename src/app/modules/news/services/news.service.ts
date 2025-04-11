import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { removeNullishFieldsParams } from '../../../core/utilities/helper-function';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  baseUrl = environment.api_base_url;

  constructor(private _http: HttpClient) { }

  getAllNews(params: any): Observable<any> {
    params = removeNullishFieldsParams(params);
    return this._http.get(`${this.baseUrl}admin/news`, { params })
  }

  getSingleNews(id: number): Observable<any> {
    return this._http.get(`${this.baseUrl}admin/news/${id}`);
  }

  exportNewsData(): Observable<any> {
    return this._http.get(`${this.baseUrl}admin/news/export/data`);
  }

  importNews(formData: FormData): Observable<any> {
    return this._http.post(`${this.baseUrl}admin/News/import`, formData);
  }

  addNews(payload: FormData): Observable<any> {
    return this._http.post(`${this.baseUrl}admin/News`, payload);
  }

  deleteNews(id: number): Observable<any> {
    return this._http.delete(`${this.baseUrl}admin/News/${id}`);
  }
}
