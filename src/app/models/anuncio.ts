import { Persona } from "./persona";

export class Anuncio{
    id:number=0;
    no_anuncio:string="";
    di_anuncio:string="";
    fe_inicio:Date= new Date();
    fe_fin:Date= new Date();
    persona:Persona = new Persona;
}