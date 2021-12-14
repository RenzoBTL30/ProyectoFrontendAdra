import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { map, catchError} from 'rxjs/operators';
import { AuthService } from '../core/presentation/views/login/auth.service';
import { Injectable } from '@angular/core';
import { PedidoOracion } from '../models/pedido_oracion';
import { listarPedidosBancoAsesor } from '../models/listapedidoAsesor';

@Injectable({
  providedIn: 'root'
})
export class PedidooracionService {

  //private url:string ='http://localhost:9292/api/pedidosoracion';
  private url:string ='https://app-adra.herokuapp.com/api/pedidosoracion';

  constructor(private http : HttpClient, private router: Router, private authService: AuthService) { }
  
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  private agregarAuthorizationHeader(){
    let token = this.authService.token;
    if(token!=null){
      return this.httpHeaders.append('Authorization','Bearer '+ token);
    }
    return this.httpHeaders;
  }

  getPedidos():Observable<PedidoOracion[]>{
    return this.http.get<PedidoOracion[]>(this.url + '/all', {headers: this.agregarAuthorizationHeader()});    
  }
  create(pedidoOracion:PedidoOracion):Observable<PedidoOracion>{
    return this.http.post(this.url + '/post', pedidoOracion, {headers: this.agregarAuthorizationHeader()})
    .pipe(
      map((response: any)=> response.post as PedidoOracion),
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
  getPedidoId(id:number): Observable<PedidoOracion>{
    return this.http.get<PedidoOracion>(`${this.url}/all/${id}`, {headers: this.agregarAuthorizationHeader()}).pipe(
      catchError(e=>{
        if(e.status != 401 && e.error.mensaje){
          
        }
        return throwError(0);
      }));
  }
  update(pedidoOracion:PedidoOracion):Observable<any>{
    return this.http.put<any>(`${this.url}/update/${pedidoOracion.id}`, pedidoOracion, {headers: this.agregarAuthorizationHeader()}).pipe(
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
  delete(id:number):Observable<PedidoOracion>{
    return this.http.delete<PedidoOracion>(`${this.url}/delete/${id}`, {headers: this.agregarAuthorizationHeader()}).pipe(
      catchError(e =>{
        if(e.error.mensaje){
          console.error(e.error.mensaje);
        }
        return throwError(e);
      }));
  }

  getlistarPedidosBancoAsesorId(id:number): Observable<listarPedidosBancoAsesor[]>{
    return this.http.get<listarPedidosBancoAsesor[]>(`${this.url}/listarPedidosBancoAsesor/${id}`, {headers: this.agregarAuthorizationHeader()}).pipe(
      catchError(e=>{
        if(e.status != 401 && e.error.mensaje){
          
        }
        return throwError(0);
      }));
  }
}
