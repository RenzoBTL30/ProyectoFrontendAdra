import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../core/presentation/views/login/auth.service';
import { BancoComunal } from '../models/banco_comunal';

@Injectable({
  providedIn: 'root'
})
export class BancocomunalService {

  private urlbanco:string ='http://localhost:9292/api/bancoscomunales';
  constructor(private http : HttpClient, private router: Router, private authService: AuthService) { }

  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  private agregarAuthorizationHeader(){
    let token = this.authService.token;
    if(token!=null){
      return this.httpHeaders.append('Authorization','Bearer '+ token);
    }
    return this.httpHeaders;
  }

  getBancos():Observable<BancoComunal[]>{
    return this.http.get<BancoComunal[]>(this.urlbanco + '/all',{headers: this.agregarAuthorizationHeader()});    
  }

  getBancoId(id:number): Observable<BancoComunal>{
    return this.http.get<BancoComunal>(`${this.urlbanco}/all/${id}`, {headers: this.agregarAuthorizationHeader()}).pipe(
      catchError(e=>{
        if(e.status != 401 && e.error.mensaje){
          
        }
        return throwError(0);
      }));
  }
}
