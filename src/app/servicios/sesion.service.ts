import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { map, catchError} from 'rxjs/operators';
import { AuthService } from '../core/presentation/views/login/auth.service';
import { Sesion } from '../models/sesion';


@Injectable({
  providedIn: 'root'
})
export class SesionService {

  //private urlsesion:string ='http://localhost:9292/api/sesiones';
  private urlsesion:string ='https://app-adra.herokuapp.com/api/sesiones';

  constructor(private http : HttpClient, private router: Router, private authService: AuthService) { }

  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  private agregarAuthorizationHeader(){
    let token = this.authService.token;
    if(token!=null){
      return this.httpHeaders.append('Authorization','Bearer '+ token);
    }
    return this.httpHeaders;
  }


  getSesiones():Observable<Sesion[]>{
    return this.http.get<Sesion[]>(this.urlsesion + '/all', {headers: this.agregarAuthorizationHeader()});    
  }
  create(sesion:Sesion):Observable<Sesion>{
    return this.http.post(this.urlsesion + '/post', sesion, {headers: this.agregarAuthorizationHeader()})
    .pipe(
      map((response: any)=> response.post as Sesion),
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
  getSesionId(id:number): Observable<Sesion>{
    return this.http.get<Sesion>(`${this.urlsesion}/all/${id}`, {headers: this.agregarAuthorizationHeader()}).pipe(
      catchError(e=>{
        if(e.status != 401 && e.error.mensaje){
          
        }
        return throwError(0);
      }));
  }
  update(sesion:Sesion):Observable<any>{
    return this.http.put<any>(`${this.urlsesion}/update/${sesion.id}`, sesion, {headers: this.agregarAuthorizationHeader()}).pipe(
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

  deleteSesion(sesion:Sesion):Observable<Sesion>{
    return this.http.put<any>(`${this.urlsesion}/delete/${sesion.id}`, sesion, {headers: this.agregarAuthorizationHeader()})
    .pipe(
      catchError(e =>{
        if(e.error.mensaje){
          console.error(e.error.mensaje);
        }
        return throwError(e);
      }));
  }
}
