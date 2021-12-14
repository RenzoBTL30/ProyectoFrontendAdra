import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../core/presentation/views/login/auth.service';
import { ControlVista } from '../models/control_vista';

@Injectable({
  providedIn: 'root'
})
export class ControlvistaService {

  private urlcontrolvista:string ='http://localhost:9292/api/controlvistas';
  constructor(private http : HttpClient, private router: Router, private authService: AuthService) { }

  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  private agregarAuthorizationHeader(){
    let token = this.authService.token;
    if(token!=null){
      return this.httpHeaders.append('Authorization','Bearer '+ token);
    }
    return this.httpHeaders;
  }

  getControlesVista():Observable<ControlVista[]>{
    return this.http.get<ControlVista[]>(this.urlcontrolvista + '/all',{headers: this.agregarAuthorizationHeader()});    
  }

  getControlVistaId(id:number): Observable<ControlVista>{
    return this.http.get<ControlVista>(`${this.urlcontrolvista}/all/${id}`, {headers: this.agregarAuthorizationHeader()}).pipe(
      catchError(e=>{
        if(e.status != 401 && e.error.mensaje){
          
        }
        return throwError(0);
      }));
  }

  actualizarVisto(idafil:number, idrec:number):Observable<any>{
    return this.http.put<any>(`${this.urlcontrolvista}/updatevisto/${idafil}/${idrec}`,{responseType: 'text'}, {headers: this.agregarAuthorizationHeader()}).pipe(
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

  actualizarComentario(control:ControlVista):Observable<any>{
    return this.http.put<any>(`${this.urlcontrolvista}/updatecomentario/${control.id}`, control, {headers: this.agregarAuthorizationHeader()}).pipe(
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
