import { Privilegio } from "./privilegio";
import { Rol } from "./rol";

export class RolPrivilegio{
    id:number=0;
    rol:Rol = new Rol;
    privilegio:Privilegio = new Privilegio;
}