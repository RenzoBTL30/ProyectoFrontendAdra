import { Sesion } from "./sesion";
import { Afiliacion } from "./afiliacion";

export class SesionSocio{
    id:number=0;
    nu_valoracion:number=0;
    ca_recursos_vistos:number=0;
    sesion:Sesion = new Sesion;
    afiliacion:Afiliacion = new Afiliacion;
}