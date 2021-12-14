import { Persona } from "./persona";

export class Usuario{
    id:number=0;
    nu_dni:string="";
    de_contrasenia: string="";
    es_usuario: string ="1";
    persona:Persona = new Persona;
    roles:string[]=[];
}