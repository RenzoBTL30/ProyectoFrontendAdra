import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { map, catchError} from 'rxjs/operators';
import { AuthService } from '../core/presentation/views/login/auth.service';
import { ListacapacAsesor } from '../models/listacapacAsesor';
import { ListaProgresoPorSesiones } from '../models/listaProgresoPorSesiones';
import { ListaRecursos } from '../models/listaRecursos';
import { ListaSociosModuloAsesor } from '../models/listasociosModuloAsesor';
import { Persona } from '../models/persona';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  private urlpersona:string ='http://localhost:9292/api/personas';
  constructor(private http : HttpClient, private router: Router, private authService: AuthService) { }

  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  private agregarAuthorizationHeader(){
    let token = this.authService.token;
    if(token!=null){
      return this.httpHeaders.append('Authorization','Bearer '+ token);
    }
    return this.httpHeaders;
  }

  getPersonas():Observable<Persona[]>{
    return this.http.get<Persona[]>(this.urlpersona + '/all',{headers: this.agregarAuthorizationHeader()});    
  }

  getPersonaId(id:number): Observable<Persona>{
    return this.http.get<Persona>(`${this.urlpersona}/all/${id}`, {headers: this.agregarAuthorizationHeader()}).pipe(
      catchError(e=>{
        if(e.status != 401 && e.error.mensaje){
          
        }
        return throwError(0);
      }));
  }

  getlistaCapacAsesorId(id:number): Observable<ListacapacAsesor[]>{
    return this.http.get<ListacapacAsesor[]>(`${this.urlpersona}/listaCapacAsesor/${id}`, {headers: this.agregarAuthorizationHeader()}).pipe(
      catchError(e=>{
        if(e.status != 401 && e.error.mensaje){
          
        }
        return throwError(0);
      }));
  }

  getlistaSociosModuloAsesor(idcap:number, idper:number): Observable<ListaSociosModuloAsesor[]>{
    return this.http.get<ListaSociosModuloAsesor[]>(`${this.urlpersona}/listaSociosModuloAsesor/${idcap}/${idper}`, {headers: this.agregarAuthorizationHeader()}).pipe(
      catchError(e=>{
        if(e.status != 401 && e.error.mensaje){
          
        }
        return throwError(0);
      }));
  }

  getListaProgresoPorSesiones(idsoc:number, idcap:number): Observable<ListaProgresoPorSesiones[]>{
    return this.http.get<ListaProgresoPorSesiones[]>(`${this.urlpersona}/listaProgresoPorSesiones/${idsoc}/${idcap}`, {headers: this.agregarAuthorizationHeader()}).pipe(
      catchError(e=>{
        if(e.status != 401 && e.error.mensaje){
          
        }
        return throwError(0);
      }));
  }

  getListaRecursos(idsoc:number, idses:number): Observable<ListaRecursos[]>{
    return this.http.get<ListaRecursos[]>(`${this.urlpersona}/listaRecursos/${idsoc}/${idses}`, {headers: this.agregarAuthorizationHeader()}).pipe(
      catchError(e=>{
        if(e.status != 401 && e.error.mensaje){
          
        }
        return throwError(0);
      }));
  }

}
