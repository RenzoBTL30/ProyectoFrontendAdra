import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../core/presentation/views/login/auth.service';
import { SesionSocio } from '../models/sesion_socio';

@Injectable({
  providedIn: 'root'
})
export class SesionsocioService {

  //private urlsesionsocio:string ='http://localhost:9292/api/sesionsocios';
  private urlsesionsocio:string ='https://app-adra.herokuapp.com/api/sesionsocios';


  constructor(private http : HttpClient, private router: Router, private authService: AuthService) { }

  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  private agregarAuthorizationHeader(){
    let token = this.authService.token;
    if(token!=null){
      return this.httpHeaders.append('Authorization','Bearer '+ token);
    }
    return this.httpHeaders;
  }

  getSesionesSocio():Observable<SesionSocio[]>{
    return this.http.get<SesionSocio[]>(this.urlsesionsocio + '/all',{headers: this.agregarAuthorizationHeader()});    
  }

  getSesionSocioId(id:number): Observable<SesionSocio>{
    return this.http.get<SesionSocio>(`${this.urlsesionsocio}/all/${id}`, {headers: this.agregarAuthorizationHeader()}).pipe(
      catchError(e=>{
        if(e.status != 401 && e.error.mensaje){
          
        }
        return throwError(0);
      }));
  }

  updatevaloracion(idafil:number, idses:number, nuvalor:number, coment:string):Observable<any>{
    return this.http.put<any>(`${this.urlsesionsocio}/updatevaloracion/${idafil}/${idses}/${nuvalor}/${coment}`,{responseType: 'text'}, {headers: this.agregarAuthorizationHeader()}).pipe(
      catchError(e =>{
        if(e.status == 400){
          return throwError(e);
        }
        if(e.error.mensaje){
          console.error(e.error.mensaje);        
        }
        return throwError(e);
      })
    )
  }
}
