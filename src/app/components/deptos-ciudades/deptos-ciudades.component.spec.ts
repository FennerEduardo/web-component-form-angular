import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeptosCiudadesComponent } from './deptos-ciudades.component';

describe('DeptosCiudadesComponent', () => {
  let component: DeptosCiudadesComponent;
  let fixture: ComponentFixture<DeptosCiudadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeptosCiudadesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeptosCiudadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
