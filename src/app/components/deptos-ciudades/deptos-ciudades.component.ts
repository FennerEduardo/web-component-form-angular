import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { OptionsSelect } from '../select/select.interface';
import { RootObject } from './deptos-ciudades.interface';
import { DeptosCiudadesService } from './deptos-ciudades.service';

@Component({
  selector: 'app-deptos-ciudades',
  templateUrl: './deptos-ciudades.component.html',
  styleUrls: ['./deptos-ciudades.component.css']
})
export class DeptosCiudadesComponent implements OnInit {

  OptionsDeptos: Array<OptionsSelect> = []
  OptionsCiudades: Array<OptionsSelect> = []
  deptoId: string = ''
  ciudadId: string = ''

  @Input('propDeptoId') propDeptoId = '';
  @Input('propCiudadId') propCiudadId = '';
  @Input('divClasses') divClasses = '';
  @Input('requiredDeptos') requiredDeptos = '';
  @Input('requiredCiudades') requiredCiudades = '';
  @Output() changeDepartamento: EventEmitter<any> = new EventEmitter();
  @Output() changeCiudad: EventEmitter<any> = new EventEmitter();

  constructor(private api: DeptosCiudadesService) { }

  ngOnInit(): void {
    this.settingDeptos();
    // if(this.propDeptoId !== ''){
      this.settingCiudades(this.propDeptoId);
    // }
  }

  changeDepto(event: Event) {
    this.deptoId = (event.target as HTMLSelectElement)?.value;
    this.changeDepartamento.emit(this.deptoId);
    this.settingCiudades(this.deptoId);
  }

  changeCity(event: Event) {
    this.ciudadId = (event.target as HTMLSelectElement)?.value;
    this.changeCiudad.emit(this.ciudadId);
  }

  settingDeptos() {
    this.api.get().subscribe((data: RootObject) => {
      data.data.forEach(depto => {
        // console.log(depto);

        this.OptionsDeptos.push({
          value: `${depto.attributes.drupal_internal__tid}`,
          text: depto.attributes.name
        })
      })
    })
  }

  settingCiudades(deptoId: string) {
    this.api.getCiudades(deptoId).subscribe((data: RootObject) => {
      this.OptionsCiudades = [];
      data.data.forEach(city => {
        // console.log(city);

        this.OptionsCiudades.push({
          value: `${city.attributes.drupal_internal__tid}`,
          text: city.attributes.name
        })
      })
    })

  }

}
