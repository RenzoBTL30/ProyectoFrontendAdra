import { Afiliacion } from "./afiliacion";
import { Recurso } from "./recurso";

export class ControlVista{
    id:number = 0;
    de_comentario:string = "";
    es_visto:string = "";
    recurso:Recurso = new Recurso;
    afiliacion:Afiliacion = new Afiliacion;
}