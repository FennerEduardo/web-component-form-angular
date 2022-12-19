import { HttpClient, HttpParams, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { File, ObjectJson } from './main-form.interface';


@Component({
  selector: 'app-main-form',
  templateUrl: './main-form.component.html',
  styleUrls: ['./main-form.component.css']
})
export class MainFormComponent implements OnInit {


  ObjectJson: ObjectJson = {
    author: {
      identification: '123'
    },
    authorDependence: {
      code: "71301"
    },
    type: {
      id: "2563"
    },
    reference: "Prueba Cancelación de Gravamenes",
    observations: "Correo electrónico - checklist",
    sourceThirdPerson: {
      identificationType: {
        name: ""
      },
      identification: "",
      name: "",
      lastname: "",
      email: "",
      address: "",
      phone: "",
      municipality: {
        code: "11001"
      }
    },
    targetDependence: {
      code: "71301"
    },
    targetUser: {
      identification: "46382722"
    }
  };
  ciudadId: string = '';
  deptoId: string = '';
  IdentificationTypeSelected: string = '';
  files: Array<File> = []

  optionsIdentificationType = [
    {
      value: 'CC',
      text: 'Cedula de ciudadania'
    },
    {
      value: 'CE',
      text: 'Cédula de Extranjería'
    },
    {
      value: 'PP',
      text: 'Pasaporte'
    }
  ];


  json: null | File = null;
  params = new HttpParams();
  headers = new HttpHeaders();

  parserMap: any = {
    'application/json': JSON.parse,
  };


  constructor(private http: HttpClient) {

  }

  ngOnInit(): void { }

  // OnClick of button Upload
  onUpload(event: Event) {
    event.preventDefault();

    const formData = new FormData();
    const jsn = JSON.stringify(this.ObjectJson);
    const blobJson = new Blob([jsn], { type: 'application/json' });
    const fileJson = new File([blobJson], 'document.json', { type: 'application/json' });

    formData.append("document.json", fileJson, fileJson.name);

    this.files.forEach((item: any) => {
      formData.append(item.type, item.file, item.file.name);
    })

    const httpOptions = {
      params: new HttpParams().set("appkey", "nXSw+spZBJdPbAZSqnzkF4oMWy4Cmv7cj5Ni0NAAM+4="),
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    };

    const upload$ = this.http.post(`https://pruebas-gesdoc.minvivienda.gov.co:443/SGD_WS/gesdoc/createReceived`, formData, httpOptions);

    upload$.subscribe((data: any) => {
      const newResponse = this.parseResponse(data);
      console.log(newResponse);
    });
  }

  parseResponse(response: any): HttpResponse<any> {
    const contentTypeHeaderValue = response.headers.get('Content-Type');
    const body = response.body;
    const contentTypeArray = contentTypeHeaderValue.split(';');
    const contentType = contentTypeArray[0];
    switch (contentType) {
      case 'multipart/related':
      case 'multipart/mixed':
        const boundary1 = contentTypeArray[1].split('boundary=')[1];
        const parsed1 = this.parseMultipart(body, boundary1);
        if (parsed1 === false) {
          throw Error('Unable to parse multipart response');
        }
        return response.clone({ body: parsed1 });
      case 'multipart/form-data':
        const boundary = contentTypeArray[1].split('boundary=')[1];
        const parsed = this.parseMultipart(body, boundary);
        if (parsed === false) {
          throw Error('Unable to parse multipart response');
        }
        return response.clone({ body: parsed });
      default:
        return response;
    }
  }

  parseMultipart(multipart: string, boundary: string): any {
    const dataArray: string[] = multipart.split(`--${boundary}`);
    dataArray.shift();
    dataArray.forEach((dataBlock) => {
      const rows = dataBlock.split(/\r?\n/).splice(1, 4);
      if (rows.length < 1) {
        return;
      }
      const headers = rows.splice(0, 2);
      const body = rows.join('');
      if (headers.length > 1) {
        const pattern = /Content-Type: ([a-z\/+]+)/g;
        const match = pattern.exec(headers[0]);
        if (match === null) {
          throw Error('Unable to find Content-Type header value');
        }
        const contentType = match[1];
        if (this.parserMap.hasOwnProperty(contentType) === true) {
          return this.parserMap[contentType](body);
        }
      }
    });
    return false;
  }

  settingDeptoId(event: Event) {
    this.deptoId = `${event}`
  }

  settingCiudadId(event: Event) {
    this.ciudadId = `${event}`
  }

  changeSelectoptionsIdentificationType(event: Event) {
    this.ObjectJson.sourceThirdPerson.identificationType.name = (event.target as HTMLSelectElement)?.value;
  }

  setIdentification(event: Event) {
    this.ObjectJson.sourceThirdPerson.identification = (event.target as HTMLSelectElement)?.value;
  }
  setName(event: Event) {
    this.ObjectJson.sourceThirdPerson.name = (event.target as HTMLSelectElement)?.value;
  }
  setLastName(event: Event) {
    this.ObjectJson.sourceThirdPerson.lastname = (event.target as HTMLSelectElement)?.value;
  }
  setEmail(event: Event) {
    this.ObjectJson.sourceThirdPerson.email = (event.target as HTMLSelectElement)?.value;
  }
  setAddress(event: Event) {
    this.ObjectJson.sourceThirdPerson.address = (event.target as HTMLSelectElement)?.value;
  }
  setPhone(event: Event) {
    this.ObjectJson.sourceThirdPerson.phone = (event.target as HTMLSelectElement)?.value;
  }

  changeDoc(event: any) {
    if (typeof event === 'object' && event !== null) {
      const { files } = event;
      if (files.length) {
        files.forEach((file: File) => {
          if (
            !this.files.some(item => item.type === 'documento1') &&
            !this.files.some(item => item.file === file)
          ) {
            this.files.push({ type: 'documento1', file });
          }
        });
      }
    }
    this.checkFiles();
  }

  checkFiles() {
    if (this.files.length) {

      if (this.files[0].type === 'documento1' && this.files[0].file.constructor === File) {
        // console.log(this.btnSubmit);
      }
    }
  }



  changeFiles(event: any) {
    if (typeof event === 'object' && event !== null) {
      const { files } = event;
      if (files.length) {
        files.forEach((file: File, idx: number) => {
          if (
            !this.files.some(item => item.file === file)
          ) {
            this.files.push({ type: `anexo${idx + 1}`, file });
          }
        });
      }
    }
  }

  deleteFile(event: any) {
    this.files.forEach((item, idx) => {
      if (item.file === event) {
        this.files.splice(idx, 1);
      }
    });
  }
}
