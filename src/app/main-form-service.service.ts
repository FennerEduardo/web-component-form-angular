import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MainFormServiceService {

  constructor(private httpClient: HttpClient) { }

  params = new HttpParams();

  headers = new HttpHeaders();

  post(): Observable<any> {
    return this.httpClient.get(`http://186.30.164.138/SGD_WS/gesdoc/createReceived`, { params: this.params, headers: this.headers });
  }
}
