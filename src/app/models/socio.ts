import { BancoComunal } from "./banco_comunal";
import { Persona } from "./persona";

export class Socio{
    id:number=0;
    persona:Persona = new Persona;
    banco_comunal:BancoComunal = new BancoComunal;
}