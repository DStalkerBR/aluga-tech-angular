import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root',
})
export class DatabaseService<T> {
  private readonly url = environment.url;
  private readonly endpoint : string;

  constructor(private http: HttpClient, @Inject('endpoint') endpoint: string) {
    this.endpoint = endpoint;
  }

  post(entity: any) {
    return this.http.post<T>(`${this.url}${this.endpoint}.json`, entity);
  }

  getAll(): Observable<T[]> {
    return this.http.get<T[]>(`${this.url}${this.endpoint}.json`);
  }

  get(key: string) {
    return this.http.get<T>(`${this.url}${this.endpoint}/${key}.json`);
  }

  getByColumn(key: string, column: string): Observable<any> {
    return this.http.get<T>(`${this.url}${this.endpoint}.json?orderBy="${column}"&equalTo=${key}`);
  }

  put(key: string, entity: any) {
    return this.http.put<T>(`${this.url}${this.endpoint}/${key}.json`, entity);
  }

  delete(key: string) {
    return this.http.delete<T>(`${this.url}${this.endpoint}/${key}.json`);
  }
}
