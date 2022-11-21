import { Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { MainFormComponent } from './main-form/main-form.component';
import { createCustomElement } from '@angular/elements';

@NgModule({
  declarations: [
    AppComponent,
    MainFormComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [ MainFormComponent]
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
