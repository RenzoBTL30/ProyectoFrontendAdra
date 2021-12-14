import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../core/presentation/views/login/auth.service';
import { Reporte1 } from '../models/reporte1';
import { Reporte2 } from '../models/reporte2';
import { Reporte3 } from '../models/reporte3';
import { Reporte4 } from '../models/reporte4';
import { Reporte5 } from '../models/reporte5';
import { Reporte6 } from '../models/reporte6';

@Injectable({
  providedIn: 'root'
})
export class ReporteService {

  //private urlreporte:string ='http://localhost:9292/api/reportes';
  private urlreporte:string ='https://app-adra.herokuapp.com/api/reportes';



  constructor(private http : HttpClient, private router: Router, private authService: AuthService) { }

  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  private agregarAuthorizationHeader(){
    let token = this.authService.token;
    if(token!=null){
      return this.httpHeaders.append('Authorization','Bearer '+ token);
    }
    return this.httpHeaders;
  }

  getUsuariosActivos():Observable<Reporte1[]>{
    return this.http.get<Reporte1[]>(this.urlreporte + '/listarUserAct',{headers: this.agregarAuthorizationHeader()});    
  }

  getUsuariosRoles():Observable<Reporte2[]>{
    return this.http.get<Reporte2[]>(this.urlreporte + '/listarUserRol',{headers: this.agregarAuthorizationHeader()});    
  }

  getReporteProgreso(id:number):Observable<Reporte3[]>{
    return this.http.get<Reporte3[]>(`${this.urlreporte}/reporteProgMod/${id}`, {headers: this.agregarAuthorizationHeader()}).pipe(
      catchError(e=>{
        if(e.status != 401 && e.error.mensaje){

        }
        return throwError(0);
      }));    
  }

  getReporteAsistSem(id:number):Observable<Reporte4[]>{
    return this.http.get<Reporte4[]>(`${this.urlreporte}/reporteAsistSem/${id}`, {headers: this.agregarAuthorizationHeader()}).pipe(
      catchError(e=>{
        if(e.status != 401 && e.error.mensaje){
          
        }
        return throwError(0);
      }));    
  }

  getSociosporBanco(id:number):Observable<Reporte5[]>{
    return this.http.get<Reporte5[]>(`${this.urlreporte}/listarSociosBanco/${id}`, {headers: this.agregarAuthorizationHeader()}).pipe(
      catchError(e=>{
        if(e.status != 401 && e.error.mensaje){
          
        }
        return throwError(0);
      }));    
  }

  getReporteSatisfac(id:number):Observable<Reporte6[]>{
    return this.http.get<Reporte6[]>(`${this.urlreporte}/reporteSatisfacMod/${id}`, {headers: this.agregarAuthorizationHeader()}).pipe(
      catchError(e=>{
        if(e.status != 401 && e.error.mensaje){
          
        }
        return throwError(0);
      }));    
  }
}
