import { Capacitacion } from "./capacitacion";

export class Sesion{
    id:number=0;
    de_tema:string="";
    fe_inicio:Date= new Date();
    fe_fin:Date= new Date();
    nu_orden:number=0;
    ca_recursos:number=0;
    es_sesion:string="";
    capacitacion:Capacitacion = new Capacitacion;
}