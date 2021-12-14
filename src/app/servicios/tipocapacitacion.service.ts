import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { map, catchError} from 'rxjs/operators';
import { Tipo_Capacitacion } from '../models/tipo_capacitacion';
import { AuthService } from '../core/presentation/views/login/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TipoCapacitacionService {

  //private urltipocapacitacion:string ='http://localhost:9292/api/tiposcapacitacion';
  private urltipocapacitacion:string ='https://app-adra.herokuapp.com/api/tiposcapacitacion';

  constructor(private http : HttpClient, private router: Router, private authService: AuthService) { }

  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  private agregarAuthorizationHeader(){
    let token = this.authService.token;
    if(token!=null){
      return this.httpHeaders.append('Authorization','Bearer '+ token);
    }
    return this.httpHeaders;
  }

  getTiposCap():Observable<Tipo_Capacitacion[]>{
    return this.http.get<Tipo_Capacitacion[]>(this.urltipocapacitacion + '/all', {headers: this.agregarAuthorizationHeader()});    
  }

  create(capacitacion:Tipo_Capacitacion):Observable<Tipo_Capacitacion>{
    return this.http.post(this.urltipocapacitacion + '/post', capacitacion, {headers: this.agregarAuthorizationHeader()})
    .pipe(
      map((response: any)=> response.post as Tipo_Capacitacion),
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
  getTiposCapId(id:number): Observable<Tipo_Capacitacion>{
    return this.http.get<Tipo_Capacitacion>(`${this.urltipocapacitacion}/all/${id}`, {headers: this.agregarAuthorizationHeader()}).pipe(
      catchError(e=>{
        if(e.status != 401 && e.error.mensaje){

        }
        return throwError(0);
      }));
  }
  update(tipo_capacitacion:Tipo_Capacitacion):Observable<any>{
    return this.http.put<any>(`${this.urltipocapacitacion}/update/${tipo_capacitacion.id}`, tipo_capacitacion, {headers: this.agregarAuthorizationHeader()}).pipe(
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
  delete(id:number):Observable<Tipo_Capacitacion>{
    return this.http.delete<Tipo_Capacitacion>(`${this.urltipocapacitacion}/delete/${id}`).pipe(
      catchError(e =>{
        if(e.error.mensaje){
          console.error(e.error.mensaje);
        }
        return throwError(e);
      }));
  }
}
