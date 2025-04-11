import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { removeNullishFieldsParams } from '../../../core/utilities/helper-function';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  baseUrl = environment.api_base_url;

  constructor(private _http: HttpClient) { }

  getAllBlogs(params?: any): Observable<any> {
    params = removeNullishFieldsParams(params);
    return this._http.get(`${this.baseUrl}admin/blogs`, { params })
  }

  getBlog(id: number): Observable<any> {
    return this._http.get(`${this.baseUrl}admin/blogs/${id}`);
  }
  
  addBlogs(payload: FormData): Observable<any> {
    return this._http.post(`${this.baseUrl}admin/blogs`, payload);
  }

  deleteBlog(id: number): Observable<any> {
    return this._http.delete(`${this.baseUrl}admin/blogs/${id}`);
  }

  exportBlogsData(): Observable<any> {
    return this._http.get(`${this.baseUrl}admin/blogs/export/data`);
  }

  importBlogs(formData: FormData): Observable<any> {
    return this._http.post(`${this.baseUrl}admin/blogs/import`, formData);
  }
}

