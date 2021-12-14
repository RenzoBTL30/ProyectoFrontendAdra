import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../core/presentation/views/login/auth.service';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  //private urlusuario:string ='http://localhost:9292/api/usuarios';
  private urlusuario:string ='https://app-adra.herokuapp.com/api/usuarios';


  constructor(private http : HttpClient, private router: Router, private authService: AuthService) { }

  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  private agregarAuthorizationHeader(){
    let token = this.authService.token;
    if(token!=null){
      return this.httpHeaders.append('Authorization','Bearer '+ token);
    }
    return this.httpHeaders;
  }

  getUsuarios():Observable<Usuario[]>{
    return this.http.get<Usuario[]>(this.urlusuario + '/all',{headers: this.agregarAuthorizationHeader()});    
  }

  getUsuarioId(id:number): Observable<Usuario>{
    return this.http.get<Usuario>(`${this.urlusuario}/all/${id}`, {headers: this.agregarAuthorizationHeader()}).pipe(
      catchError(e=>{
        if(e.status != 401 && e.error.mensaje){
          
        }
        return throwError(0);
      }));
  }
}
