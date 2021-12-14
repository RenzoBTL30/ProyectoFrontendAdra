import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { map, catchError} from 'rxjs/operators';
import { Recurso } from '../models/recurso';
import { AuthService } from '../core/presentation/views/login/auth.service';


@Injectable({
  providedIn: 'root'
})
export class RecursoService {

  //private urlrecurso:string ='http://localhost:9292/api/recursos';
  private urlrecurso:string ='https://app-adra.herokuapp.com/api/recursos';



  constructor(private http : HttpClient, private router: Router, private authService: AuthService) { }

  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  private agregarAuthorizationHeader(){
    let token = this.authService.token;
    if(token!=null){
      return this.httpHeaders.append('Authorization','Bearer '+ token);
    }
    return this.httpHeaders;
  }

  getRecursos():Observable<Recurso[]>{
    return this.http.get<Recurso[]>(this.urlrecurso + '/all', {headers: this.agregarAuthorizationHeader()});    
  }



  create(recurso:Recurso):Observable<Recurso>{
    return this.http.post<Recurso>(this.urlrecurso + '/post', recurso, {headers: this.agregarAuthorizationHeader()})
    /*.pipe(
      map((response: any)=> response.post as Recurso),
      catchError(e =>{
        if(e.status == 400){
          return throwError(e);
        }
        if(e.error.mensaje){
          console.error(e.error.mensaje);
        }
        return throwError(e);
      }));*/
  }




  getRecursoId(id:number): Observable<Recurso>{
    return this.http.get<Recurso>(`${this.urlrecurso}/all/${id}`, {headers: this.agregarAuthorizationHeader()}).pipe(
      catchError(e=>{
        if(e.status != 401 && e.error.mensaje){
          
        }
        return throwError(0);
      }));
  }
  update(recurso:Recurso):Observable<any>{
    return this.http.put<any>(`${this.urlrecurso}/update/${recurso.id}`, recurso, {headers: this.agregarAuthorizationHeader()}).pipe(
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

  deleteRecurso(recurso:Recurso):Observable<Recurso>{
    return this.http.put<any>(`${this.urlrecurso}/delete/${recurso.id}`, recurso, {headers: this.agregarAuthorizationHeader()})
    .pipe(
      catchError(e =>{
        if(e.error.mensaje){
          console.error(e.error.mensaje);
        }
        return throwError(e);
      }));
  }
}
