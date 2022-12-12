import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeptosCiudadesService {

  constructor(private HttpClient: HttpClient) { }

  getParams = new HttpParams().append('filter[parent.meta.drupal_internal__target_id]', '0');

  get(): Observable<any> {
    return this.HttpClient.get(`https://minvivienda.gov.co/jsonapi/taxonomy_term/departamentos_y_municipios`, { params: this.getParams })
  }


  getCiudades(deptoId: string): Observable<any> {
    const paramsCities = new HttpParams().append('filter[parent.meta.drupal_internal__target_id]', deptoId);

    return this.HttpClient.get(`https://minvivienda.gov.co/jsonapi/taxonomy_term/departamentos_y_municipios`, { params: paramsCities })
  }

}
