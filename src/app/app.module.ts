import { Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { MainFormComponent } from './main-form/main-form.component';
import { createCustomElement } from '@angular/elements';
import { DeptosCiudadesComponent } from './components/deptos-ciudades/deptos-ciudades.component';
import { SelectComponent } from './components/select/select.component';

@NgModule({
  declarations: [
    AppComponent,
    MainFormComponent,
    DeptosCiudadesComponent,
    SelectComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [ AppComponent,
     MainFormComponent
     ]
})
export class AppModule {
  constructor(private injector: Injector) {
    const elementCustom = createCustomElement(MainFormComponent, {
      injector: this.injector
    });
    customElements.define('app-main-form', elementCustom);
  }
  ngDoBoostrap(): void { }

}
