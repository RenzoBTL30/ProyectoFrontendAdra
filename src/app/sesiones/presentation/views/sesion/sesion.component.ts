import { ThisReceiver } from '@angular/compiler';
import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { window } from 'rxjs/operators';
import { Afiliacion } from 'src/app/models/afiliacion';
import { ControlVista } from 'src/app/models/control_vista';
import { Recurso } from 'src/app/models/recurso';
import { Sesion } from 'src/app/models/sesion';
import { AfiliacionService } from 'src/app/servicios/afiliacion.service';
import { CapacitacionService } from 'src/app/servicios/capacitacion.service';
import { ControlvistaService } from 'src/app/servicios/controlvista.service';
import { RecursoService } from 'src/app/servicios/recurso.service';
import { SesionService } from 'src/app/servicios/sesion.service';
import { SesionsocioService } from 'src/app/servicios/sesionsocio.service';
import { SocioService } from 'src/app/servicios/socio.service';

@Component({
  selector: 'adra-sesion',
  templateUrl: './sesion.component.html',
  styleUrls: ['./sesion.component.css']
})
export class SesionComponent implements OnInit {

  id_sesion:any;
  sesion:Sesion = new Sesion();
  idafiliacion:any;
  idsocio:any;
  cant_recur_totales:any;
  cant_recur_vistos:any;

  sesiones: Sesion[]=[];
  recursos: Recurso[]=[];
  afiliaciones: Afiliacion[]=[];
  controlesvista: ControlVista[]=[];


  recurso:Recurso = new Recurso();

  tema:any;

  @ViewChild('icono') icono?: ElementRef;

  constructor(private sesionsocioService: SesionsocioService,private renderer:Renderer2 ,private socioService: SocioService, private afiliacionService: AfiliacionService, private controlvistaService: ControlvistaService, private recursoService: RecursoService, private sesionService: SesionService, private capacitacionService: CapacitacionService, private activatedRouter:ActivatedRoute) { }

  ngOnInit(): void {
    this.definirId();
    this.obtenerIdSocio();
    this.obtenerIdAfiliacion();
    this.obtenerIdSesionSocio();
    //this.listarRecurso();
    this.listarRecursosControlVista();
  }

  definirId(){
    this.activatedRouter.params.subscribe(
      e=>{
        let id=e['id'];
        this.id_sesion = id;
        if (id) {
          this.sesionService.getSesionId(id).subscribe(
            es=>{
              this.sesion=es
              this.tema=es.de_tema;
              this.cant_recur_totales=es.ca_recursos;
              console.log("cantidad de recursos totales: " + this.cant_recur_totales)
            }
          );
        }
      }
    )
  }

  efectoColor(){
    this.renderer.addClass(this.icono?.nativeElement, "icono-visto-verde");
  }

  listarRecurso(){
    this.recursoService.getRecursos().subscribe(data =>{
      this.recursos=data;
    });
  }

  listarRecursosControlVista(){
    this.controlvistaService.getControlesVista().subscribe(data =>{
      this.controlesvista=data;
    });
  }

  actualizarVisto(idafil:number, idrecur:number){

    this.controlvistaService.actualizarVisto(idafil,idrecur).subscribe(
      res=>{
        this.listarRecursosControlVista();
        this.ngOnInit();
      }
    );
  }

  obtenerIdAfiliacion(){
    this.afiliacionService.getAfiliaciones().subscribe(data =>{
      this.afiliaciones= data;
      
      let result = this.afiliaciones.find(x => x.socio.id == this.idsocio);

      this.idafiliacion = result?.id;

      console.log("idafiliacion para sesion: " + this.idafiliacion);

    });
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

      console.log("idsocio en sesion: " +this.idsocio);
    });
  }

  obtenerIdSesionSocio(){
    this.sesionsocioService.getSesionesSocio().subscribe(data => {
      let listSesionesSocios = data;

      let result = listSesionesSocios.find(x => x.sesion.id == this.id_sesion && x.afiliacion.id == this.idafiliacion);

      this.cant_recur_vistos = result?.ca_recursos_vistos;

      console.log("cantidad de recursos vistos: " + this.cant_recur_vistos)

    });
  }

  calcularProgreso(){
    let resultado;
    return resultado = ((Math.round((this.cant_recur_vistos / this.cant_recur_totales)*100) / 100)*100) + "%";
  }

  

}
