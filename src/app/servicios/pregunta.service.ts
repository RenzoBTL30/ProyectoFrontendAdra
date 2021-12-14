import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthService } from '../core/presentation/views/login/auth.service';
import { Pregunta } from '../models/pregunta';

@Injectable({
  providedIn: 'root'
})
export class PreguntaService {

  private urlpregunta:string ='http://localhost:9292/api/preguntas';
  constructor(private http : HttpClient, private router: Router, private authService: AuthService) { }

  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  private agregarAuthorizationHeader(){
    let token = this.authService.token;
    if(token!=null){
      return this.httpHeaders.append('Authorization','Bearer '+ token);
    }
    return this.httpHeaders;
  }

  getPreguntas():Observable<Pregunta[]>{
    return this.http.get<Pregunta[]>(this.urlpregunta + '/all',{headers: this.agregarAuthorizationHeader()});    
  }
  
  create(pregunta:Pregunta):Observable<Pregunta>{
    return this.http.post(this.urlpregunta + '/post', pregunta, {headers: this.agregarAuthorizationHeader()})
    .pipe(
      map((response: any)=> response.post as Pregunta),
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

  getPreguntaId(id:number): Observable<Pregunta>{
    return this.http.get<Pregunta>(`${this.urlpregunta}/all/${id}`, {headers: this.agregarAuthorizationHeader()}).pipe(
      catchError(e=>{
        if(e.status != 401 && e.error.mensaje){
          this.router.navigate(['/menuprincipal2/modulos/vista']);
        }
        return throwError(0);
      }));
  }
  update(pregunta:Pregunta):Observable<any>{
    return this.http.put<any>(`${this.urlpregunta}/update/${pregunta.id}`, pregunta, {headers: this.agregarAuthorizationHeader()}).pipe(
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

  delete(id:number):Observable<Pregunta>{
    return this.http.delete<Pregunta>(`${this.urlpregunta}/delete/${id}`, {headers: this.agregarAuthorizationHeader()}).pipe(
      catchError(e =>{
        if(e.error.mensaje){
          console.error(e.error.mensaje);
        }
        return throwError(e);
      }));
  }
}
