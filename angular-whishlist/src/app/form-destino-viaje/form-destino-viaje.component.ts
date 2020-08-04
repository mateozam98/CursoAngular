import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DestinoViaje } from '../models/destino-viaje.model';
import { FormGroup, FormBuilder, Validators, FormControl, ValidatorFn } from '@angular/forms';
import { invalid } from '@angular/compiler/src/render3/view/util';
import { fromEvent } from 'rxjs';
import { map, filter, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
@Component({
  selector: 'app-form-destino-viaje',
  templateUrl: './form-destino-viaje.component.html',
  styleUrls: ['./form-destino-viaje.component.css']
})
export class FormDestinoViajeComponent implements OnInit {
  @Output() onItemAdded: EventEmitter<DestinoViaje>;
  fg: FormGroup;
  minlongitud = 3;
  seachResults: string[];
  constructor(fg: FormBuilder) {
    this.onItemAdded = new EventEmitter();
    this.fg = fg.group({
        nombre: ['', Validators.compose([
          Validators.required,
          this.NombreValidator,
          this.NombreValidatorParametrizable(this.minlongitud)
        ])],
        url: ['']
      });

      this.fg.valueChanges.subscribe((form: any) => {
        console.log('Cambio el formulario: ', form)
      });
   }

  ngOnInit(): void {
    let elemNombre = <HTMLInputElement>document.getElementById('nombre');
    fromEvent(elemNombre, 'input')
    .pipe(
      map((e: KeyboardEvent) =>  (e.target as HTMLInputElement).value),
      filter(text => text.length > 2),
      debounceTime(200),
      distinctUntilChanged(),
      switchMap(() => ajax ('/assets/datos.json'))
      ).subscribe(ajaxResponse => {
        console.log(ajaxResponse);
        console.log(ajaxResponse.response)
        this.seachResults = ajaxResponse.response;
      })
  }
  guardar(nombre: string, url: string): boolean{
    const d= new DestinoViaje(nombre, url);
    this.onItemAdded.emit(d);
    return false;
  }
  NombreValidator (control: FormControl): { [s: string]: boolean}{
    let l = control.value.tostring().trim().length;
    if (l > 0 && l < 5){
      return{ invalidNombre: true};
    }
    return null;
  }

  NombreValidatorParametrizable(minlong: number): ValidatorFn{
    return (control: FormControl): { [s: string]: boolean } | null => {
      const l = control.value.tostring().trim().length;
      if (l>0 && l < minlong){
        return {minLongNombre: true};
      }
      return null;
    }
  }
}
