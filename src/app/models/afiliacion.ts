import { Capacitacion } from "./capacitacion";
import { Socio } from "./socio";

export class Afiliacion{
    id:number=0;
    ca_recursos_vistos:number=0;
    capacitacion:Capacitacion = new Capacitacion;
    socio:Socio = new Socio;
}