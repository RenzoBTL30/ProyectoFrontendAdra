import { Sesion } from "./sesion";
import { TipoRecurso } from "./tipo_recurso";

export class Recurso{
    id:number=0;
    no_recurso:string="";
    nu_orden:number=0;
    di_url:string="";
    es_recurso:string="";
    sesion:Sesion = new Sesion;
    tipo_recurso:TipoRecurso = new TipoRecurso;
}