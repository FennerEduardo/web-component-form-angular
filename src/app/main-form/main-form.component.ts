import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-main-form',
  templateUrl: './main-form.component.html',
  styleUrls: ['./main-form.component.css']
})
export class MainFormComponent implements OnInit {

  nombre: string = '';
  file: null | File = null;
  json: null | File = null;
  // params = new HttpParams();
  headers = new HttpHeaders();


  constructor(private http: HttpClient) { }

  ngOnInit(): void {

  }

  setName(event: Event) {
    this.nombre = (event.target as HTMLInputElement)?.value
  }
  onFileSelected(event: Event) {
    this.file = (event.target as HTMLInputElement)?.files[0];

  }
  onJsonSelected(event: Event) {
    this.json = (event.target as HTMLInputElement)?.files[0];

  }

  // OnClick of button Upload
  onUpload(event: Event) {
    event.preventDefault();
    const formData = new FormData();



    // console.log(formData.getAll('nombre'));
    // console.log(formData.getAll('file'));

   const json = '{"author": { "identification": "0"},"type": { "id": "1813"},"reference":"prueba rest", "sourceThirdPerson": { "identificationType": {"name": "CC"}, "identification": "1998","name": "ANGÉLICA MARÍA","lastname": "TOVAR URIBE", "email": "atovar@ioip.com.co", "address": "123","phone": "123", "municipality":{ "code": "11001"}}, "targetDependence": {"code": "80174" }, "targetUser": { "identification": "35896457"}}';

   formData.append("document.json", this.json, this.json.name);

   formData.append("documento", this.file, this.file.name);
  //  formData.append("nombre", this.nombre);
  //  formData.append("appkey", 'nXSw+spZBJdPbAZSqnzkF4oMWy4Cmv7cj5Ni0NAAM+4=');


    const httpOptions = {

      headers: new HttpHeaders({

      //  " Access-Control-Allow-Origin": "*"

      // "Content-Type": "application/json",
      // 'Access-Control-Allow-Origin': 'http://localhost:5501'
        // 'Content-Transfer-Encoding': 'binary',
        // 'Content-Disposition': 'form-data; name="document.json"; filename"=document.json", form-data; name='+ this.file.name + "filename=" + this.file.name
      }),
      params: new HttpParams().set("appkey", "nXSw+spZBJdPbAZSqnzkF4oMWy4Cmv7cj5Ni0NAAM+4="),
    };


    const upload$ = this.http.post(`https://pruebas-gesdoc.minvivienda.gov.co:443/SGD_WS/gesdoc/createReceived`, formData, httpOptions);

    upload$.subscribe();

  }

}
