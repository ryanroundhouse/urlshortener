import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Url } from '@urlshortener/shortlib';

@Injectable({ providedIn: 'root' })
export class UrlService {
  private readonly baseUrl: string = 'http://localhost:3333/api';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Url[]> {
    return this.http.get<Url[]>(`${this.baseUrl}/urls`);
  }

  getByCode(code: string): Observable<Url> {
    return this.http.get<Url>(`${this.baseUrl}/urls/${code}`);
  }

  create(url: Url): Observable<Url> {
    return this.http.post<Url>(`${this.baseUrl}/urls`, url);
  }

  delete(code: string): Observable<boolean> {
    return this.http.delete<boolean>(`${this.baseUrl}/urls/${code}`);
  }
}
