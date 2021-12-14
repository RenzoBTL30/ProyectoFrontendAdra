import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, ignoreElements, map } from 'rxjs/operators';
import { AuthService } from '../core/presentation/views/login/auth.service';
import { Afiliacion } from '../models/afiliacion';
import { ModelAsignar } from '../models/modelasignar';

@Injectable({
  providedIn: 'root'
})
export class AfiliacionService {

  // private urlafil:string ='http://localhost:9292/api/afiliaciones';
  private urlafil:string ='https://app-adra.herokuapp.com/api/afiliaciones';
  constructor(private http : HttpClient, private router: Router, private authService: AuthService) { }

  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  private agregarAuthorizationHeader(){
    let token = this.authService.token;
    if(token!=null){
      return this.httpHeaders.append('Authorization','Bearer '+ token);
    }
    return this.httpHeaders;
  }

  getAfiliaciones():Observable<Afiliacion[]>{
    return this.http.get<Afiliacion[]>(this.urlafil + '/all',{headers: this.agregarAuthorizationHeader()});    
  }

  getAfiliacionId(id:number): Observable<Afiliacion>{
    return this.http.get<Afiliacion>(`${this.urlafil}/all/${id}`, {headers: this.agregarAuthorizationHeader()}).pipe(
      catchError(e=>{
        if(e.status != 401 && e.error.mensaje){
          
        }
        return throwError(0);
      }));
  }
  
  // Sale un error que no afecta a la operacion en la
  asignar(idcaps:string,idbanc:string){
    return this.http.post(`${this.urlafil}/asignar/${idcaps}/${idbanc}`,{responseType: 'text'}, {headers: this.agregarAuthorizationHeader()})
    .pipe(
      catchError(e =>{
        if(e.status == 400){
          return throwError(e);
        }
        if(e.error.mensaje){
          console.log(e.error.mensaje);
        }
        return throwError(e);
      }));
  }

  /*
  asignar(modelasignar:ModelAsignar):Observable<any>{
    return this.http.post(this.urlafil + '/asignar', modelasignar, {headers: this.agregarAuthorizationHeader()})
    .pipe(
      catchError(e =>{
        if(e.status == 400){
          return throwError(e);
        }
        if(e.error.mensaje){
          console.error(e.error.mensaje);
        }
        return throwError(e);
      }));
  }*/
}
