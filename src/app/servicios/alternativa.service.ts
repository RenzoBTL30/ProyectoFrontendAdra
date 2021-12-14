import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthService } from '../core/presentation/views/login/auth.service';
import { Alternativa } from '../models/alternativa';

@Injectable({
  providedIn: 'root'
})
export class AlternativaService {

  // private urlalternativa:string ='http://localhost:9292/api/alternativas';
  private urlalternativa:string ='https://app-adra.herokuapp.com/api/alternativas';
  constructor(private http : HttpClient, private router: Router, private authService: AuthService) { }

  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  private agregarAuthorizationHeader(){
    let token = this.authService.token;
    if(token!=null){
      return this.httpHeaders.append('Authorization','Bearer '+ token);
    }
    return this.httpHeaders;
  }

  getAlternativas():Observable<Alternativa[]>{
    return this.http.get<Alternativa[]>(this.urlalternativa + '/all',{headers: this.agregarAuthorizationHeader()});    
  }
  
  create(alternativa:Alternativa):Observable<Alternativa>{
    return this.http.post(this.urlalternativa + '/post', alternativa, {headers: this.agregarAuthorizationHeader()})
    .pipe(
      map((response: any)=> response.post as Alternativa),
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

  getAlternativaId(id:number): Observable<Alternativa>{
    return this.http.get<Alternativa>(`${this.urlalternativa}/all/${id}`, {headers: this.agregarAuthorizationHeader()}).pipe(
      catchError(e=>{
        if(e.status != 401 && e.error.mensaje){
          this.router.navigate(['/menuprincipal2/modulos/vista']);
        }
        return throwError(0);
      }));
  }
  update(alternativa:Alternativa):Observable<any>{
    return this.http.put<any>(`${this.urlalternativa}/update/${alternativa.id}`, alternativa, {headers: this.agregarAuthorizationHeader()}).pipe(
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

  delete(id:number):Observable<Alternativa>{
    return this.http.delete<Alternativa>(`${this.urlalternativa}/delete/${id}`, {headers: this.agregarAuthorizationHeader()}).pipe(
      catchError(e =>{
        if(e.error.mensaje){
          console.error(e.error.mensaje);
        }
        return throwError(e);
      }));
  }
}
