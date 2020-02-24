import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Evento } from '../_moldels/Evento';

@Injectable({
  providedIn: 'root'
})
export class EventoService {
  
  constructor(private http: HttpClient) { }
  baseURl = 'http://localhost:5000/api/evento';
  
  getAllEvento(): Observable<Evento[]>{
    return this.http.get<Evento[]>(this.baseURl);
  }
  
  getEventoByTema(tema: string): Observable<Evento[]>{
    return this.http.get<Evento[]>(`${this.baseURl}/getByTema/${tema}`);
  }
  getEventoById(id: number): Observable<Evento[]>{
    return this.http.get<Evento[]>(`${this.baseURl}/getById/${id}`);
  }
  
  postEvento(evento: Evento){
    return this.http.post(this.baseURl, evento);
  }

  putEvento(evento: Evento){
    return this.http.put(`${this.baseURl}/${evento.id}`, evento);
  }
  
  deleteEvento(id: number){
    return this.http.delete(`${this.baseURl}/${id}`)
  }
  
}
