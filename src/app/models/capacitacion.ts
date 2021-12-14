import { Tipo_Capacitacion } from "./tipo_capacitacion";

export class Capacitacion{
    id:number=0;
    no_capacitacion:string="";
    de_capacitacion:string="";
    ca_recursos:number=0;
    es_capacitacion:string="1";
    tipo_capacitacion:Tipo_Capacitacion = new Tipo_Capacitacion;
}