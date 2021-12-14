import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { map, catchError} from 'rxjs/operators';
import { AuthService } from '../core/presentation/views/login/auth.service';
import { Anuncio } from '../models/anuncio';

@Injectable({
  providedIn: 'root'
})
export class AnuncioService {

  // private urlanuncio:string ='http://localhost:9292/api/anuncios';
  private urlanuncio:string ='https://app-adra.herokuapp.com/api/anuncios'
  constructor(private http : HttpClient, private router: Router, private authService: AuthService) { }
  
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  private agregarAuthorizationHeader(){
    let token = this.authService.token;
    if(token!=null){
      return this.httpHeaders.append('Authorization','Bearer '+ token);
    }
    return this.httpHeaders;
  }

  getAnuncios():Observable<Anuncio[]>{
    return this.http.get<Anuncio[]>(this.urlanuncio + '/all', {headers: this.agregarAuthorizationHeader()});    
  }
  create(anuncio:Anuncio):Observable<Anuncio>{
    return this.http.post(this.urlanuncio + '/post', anuncio, {headers: this.agregarAuthorizationHeader()})
    .pipe(
      map((response: any)=> response.post as Anuncio),
      catchError(e =>{
        if(e.status == 400){
          return throwError(e);
        }
        if(e.error.mensaje){
          console.error(e.error.mensaje);
        }
        return throwError(e);
      }));
  }
  getAnuncioId(id:number): Observable<Anuncio>{
    return this.http.get<Anuncio>(`${this.urlanuncio}/all/${id}`, {headers: this.agregarAuthorizationHeader()}).pipe(
      catchError(e=>{
        if(e.status != 401 && e.error.mensaje){
          
        }
        return throwError(0);
      }));
  }
  update(anuncio:Anuncio):Observable<any>{
    return this.http.put<any>(`${this.urlanuncio}/update/${anuncio.id}`, anuncio, {headers: this.agregarAuthorizationHeader()}).pipe(
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
  delete(id:number):Observable<Anuncio>{
    return this.http.delete<Anuncio>(`${this.urlanuncio}/delete/${id}`, {headers: this.agregarAuthorizationHeader()}).pipe(
      catchError(e =>{
        if(e.error.mensaje){
          console.error(e.error.mensaje);
        }
        return throwError(e);
      }));
  }
}
