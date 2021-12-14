import { Pregunta } from "./pregunta";

export class Alternativa{
    id:number=0;
    no_alternativa:string="";
    es_alternativa_correcta:string="";
    pregunta:Pregunta=new Pregunta;
}