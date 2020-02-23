import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Persona } from '../_model/persona';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {
  personaCambio = new Subject<Persona[]>();
  mensajeCambio = new Subject<string>();
  
  url: string = `${environment.HOST}/personas`;
  constructor(private http : HttpClient) { }

  listarClientes(){
    return this.http.get<Persona[]>(this.url);
  }

  listarPorId(idPersona: number) {
    return this.http.get<Persona>(`${this.url}/${idPersona}`);
  }

  registrar(persona: Persona) {
    return this.http.post(this.url, persona);
  }

  modificar(persona: Persona) {
    return this.http.put(this.url, persona);
  }

  eliminar(idPersona: number) {
    return this.http.delete(`${this.url}/${idPersona}`);
  }
}
