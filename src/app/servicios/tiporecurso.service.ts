import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { map, catchError} from 'rxjs/operators';
import { AuthService } from '../core/presentation/views/login/auth.service';
import { TipoRecurso } from '../models/tipo_recurso';


@Injectable({
  providedIn: 'root'
})
export class TiporecursoService {

  private urltiporec:string ='http://localhost:9292/api/tiposrecurso';
  constructor(private http : HttpClient, private router: Router, private authService: AuthService) { }

  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  private agregarAuthorizationHeader(){
    let token = this.authService.token;
    if(token!=null){
      return this.httpHeaders.append('Authorization','Bearer '+ token);
    }
    return this.httpHeaders;
  }

  getTiposRec():Observable<TipoRecurso[]>{
    return this.http.get<TipoRecurso[]>(this.urltiporec + '/all', {headers: this.agregarAuthorizationHeader()});    
  }

  getTiposRecId(id:number): Observable<TipoRecurso>{
    return this.http.get<TipoRecurso>(`${this.urltiporec}/all/${id}`, {headers: this.agregarAuthorizationHeader()}).pipe(
      catchError(e=>{
        if(e.status != 401 && e.error.mensaje){

        }
        return throwError(0);
      }));
  }
  
}
