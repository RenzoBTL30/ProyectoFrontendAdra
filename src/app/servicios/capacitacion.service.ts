import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { map, catchError} from 'rxjs/operators';
import { AuthService } from '../core/presentation/views/login/auth.service';
import { Capacitacion } from '../models/capacitacion';
import { SeminarioList } from '../models/seminarioList';

@Injectable({
  providedIn: 'root'
})
export class CapacitacionService {

  //private urlcapacitacion:string ='http://localhost:9292/api/capacitaciones';
  private urlcapacitacion:string ='https://app-adra.herokuapp.com/api/capacitaciones';

  constructor(private http : HttpClient, private router: Router, private authService: AuthService) { }

  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  private agregarAuthorizationHeader(){
    let token = this.authService.token;
    if(token!=null){
      return this.httpHeaders.append('Authorization','Bearer '+ token);
    }
    return this.httpHeaders;
  }

  getCapacitaciones():Observable<Capacitacion[]>{
    return this.http.get<Capacitacion[]>(this.urlcapacitacion + '/all',{headers: this.agregarAuthorizationHeader()});    
  }
  
  create(capacitacion:Capacitacion):Observable<Capacitacion>{
    return this.http.post(this.urlcapacitacion + '/post', capacitacion, {headers: this.agregarAuthorizationHeader()})
    .pipe(
      map((response: any)=> response.post as Capacitacion),
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

  getCapacitacionId(id:number): Observable<Capacitacion>{
    return this.http.get<Capacitacion>(`${this.urlcapacitacion}/all/${id}`, {headers: this.agregarAuthorizationHeader()}).pipe(
      catchError(e=>{
        if(e.status != 401 && e.error.mensaje){
          this.router.navigate(['/menuprincipal2/modulos/vista']);
        }
        return throwError(0);
      }));
  }
  update(capacitacion:Capacitacion):Observable<any>{
    return this.http.put<any>(`${this.urlcapacitacion}/update/${capacitacion.id}`, capacitacion, {headers: this.agregarAuthorizationHeader()}).pipe(
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

  delete(capacitacion:Capacitacion):Observable<Capacitacion>{
    return this.http.put<any>(`${this.urlcapacitacion}/delete/${capacitacion.id}`, capacitacion, {headers: this.agregarAuthorizationHeader()})
    .pipe(
      catchError(e =>{
        if(e.error.mensaje){
          console.error(e.error.mensaje);
        }
        return throwError(e);
      }));
  }

  deleteSeminario(seminario:SeminarioList):Observable<SeminarioList>{
    return this.http.put<any>(`${this.urlcapacitacion}/deleteSem/${seminario.Id_cap}`, seminario, {headers: this.agregarAuthorizationHeader()})
    .pipe(
      catchError(e =>{
        if(e.error.mensaje){
          console.error(e.error.mensaje);
        }
        return throwError(e);
      }));
  }

  getSeminarios():Observable<SeminarioList[]>{
    return this.http.get<SeminarioList[]>(this.urlcapacitacion + '/list',{headers: this.agregarAuthorizationHeader()});    
  }
}
