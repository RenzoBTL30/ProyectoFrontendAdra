import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/presentation/views/login/auth.service';
import { Afiliacion } from 'src/app/models/afiliacion';
import { Capacitacion } from 'src/app/models/capacitacion';
import { ListacapacAsesor } from 'src/app/models/listacapacAsesor';
import { Sesion } from 'src/app/models/sesion';
import { SesionSocio } from 'src/app/models/sesion_socio';
import { AfiliacionService } from 'src/app/servicios/afiliacion.service';
import { CapacitacionService } from 'src/app/servicios/capacitacion.service';
import { PersonaService } from 'src/app/servicios/persona.service';
import { SesionService } from 'src/app/servicios/sesion.service';
import { SesionsocioService } from 'src/app/servicios/sesionsocio.service';
import { SocioService } from 'src/app/servicios/socio.service';

@Component({
  selector: 'adra-modulo',
  templateUrl: './modulo.component.html',
  styleUrls: ['./modulo.component.css']
})
export class ModuloComponent implements OnInit {

  capacitaciones: Capacitacion[]=[];
  afiliaciones: Afiliacion[]=[];
  afiliaciones_temp: Afiliacion[]=[];
  sesiones: Sesion[]=[];
  sesiones_temp: Sesion[]=[];
  listaCapacAsesor: ListacapacAsesor[]=[];


  sesionessocio: SesionSocio[]=[];
  sesionessocio_temp: SesionSocio[]=[];


  idusuario:any;
  fechaActual:Date = new Date();
  soloFecha:any;
  validador:boolean=false;

  idsocio:any;
  idafiliacion:any;
  idcapacitacion:any;
  cant_recur_totales:any;
  cant_recur_vistos:any;
  progreso:any;
  rol:any;

  constructor(private personaService:PersonaService, public datepipe:DatePipe, private sesionService: SesionService, private sesionsocioService: SesionsocioService,private afiliacionService: AfiliacionService, private socioService: SocioService, private authService: AuthService, private capacitacionService: CapacitacionService) { 
    this.soloFecha = this.fechaActual.getTime();
  }

  ngOnInit(): void {
    this.obtenerRol();
    this.obtenerIdSocio();
    this.listarAfil();
    this.listarSesion();
    this.listarCapacAsesor();
  }

  listar(){
    this.capacitacionService.getCapacitaciones().subscribe(data =>{
      this.capacitaciones= data;
    });
  }

  listarAfil(){
    this.afiliacionService.getAfiliaciones().subscribe(data =>{
      this.afiliaciones= data;
      
      let result = this.afiliaciones.find(x => x.socio.id == this.idsocio);

      this.idafiliacion = result?.id;
      this.idcapacitacion = result?.capacitacion.id;

    });
  }

  listarSesion(){
    this.sesionService.getSesiones().subscribe(data =>{
      this.sesiones=data;
    });
  }
  
  compararFechas(fecha:Date){
    if (this.fechaActual.getTime() >= new Date(fecha).getTime()) {
        this.validador=true
        return true;
    } else{
        this.validador=false
        return false;
    }
  }


  obtenerIdSocio(){
    let token = sessionStorage.getItem('token');
    let tokenstring = JSON.stringify(token);
    let payload = JSON.parse(atob(tokenstring.split('.')[1]));
  
    let idusuario;
    idusuario = payload.idusuario;
    let id = parseInt(idusuario);

    this.socioService.getSocios().subscribe(data =>{
      let listSocios = data;

      let result = listSocios.find(x => x.persona.id == id);

      this.idsocio = result?.id;

    });
  }

  calcularProgreso(cantRecTotales:number, cantRecVistos: number){
    return (Math.round((cantRecVistos / cantRecTotales)*100) / 100)*100 + "%";
  }

  obtenerRol():any{

    let usuario = this.authService.usuario;

    this.rol = usuario.roles[0];

  }  

  listarCapacAsesor(){
    let token = sessionStorage.getItem('token');
    let tokenstring = JSON.stringify(token);
    let payload = JSON.parse(atob(tokenstring.split('.')[1]));
  
    let idusuario;
    idusuario = payload.idusuario;
    let id = parseInt(idusuario);

    this.socioService.getSocios().subscribe(data =>{
      let listSocios = data;

      let result = listSocios.find(x => x.persona.id == id);

      this.idsocio = result?.id;

      console.log(this.idsocio);
    });

    this.personaService.getlistaCapacAsesorId(idusuario).subscribe(data =>{
      this.listaCapacAsesor= data;
    });
  }
  
}
