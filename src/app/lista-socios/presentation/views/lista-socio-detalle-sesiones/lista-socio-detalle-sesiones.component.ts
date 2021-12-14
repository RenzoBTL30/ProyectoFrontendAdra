import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListaProgresoPorSesiones } from 'src/app/models/listaProgresoPorSesiones';
import { ListaRecursos } from 'src/app/models/listaRecursos';
import { PersonaService } from 'src/app/servicios/persona.service';
import { SesionService } from 'src/app/servicios/sesion.service';
import { SocioService } from 'src/app/servicios/socio.service';

@Component({
  selector: 'adra-lista-socio-detalle-sesiones',
  templateUrl: './lista-socio-detalle-sesiones.component.html',
  styleUrls: ['./lista-socio-detalle-sesiones.component.css']
})
export class ListaSocioDetalleSesionesComponent implements OnInit {

  idsoc:any;
  idses:any;
  idcap:any;

  nombre:any;
  apepat:any;
  apemat:any;

  tema:any;
  progreso:any;

  listaRecursos:ListaRecursos[]=[];

  constructor(private sesionService:SesionService, private socioService: SocioService, private activatedRouter:ActivatedRoute, private personaService: PersonaService) { }

  ngOnInit(): void {
    this.listarRecursos();
  }

  listarRecursos(){
    this.activatedRouter.params.subscribe(
      e=>{
        let id=e['idsoc'];
        this.idsoc = id;
        
        let id2=e['idses'];
        this.idses = id2;

        let id3=e['progres'];
        this.progreso = id3;

    });

    this.personaService.getListaRecursos(this.idsoc, this.idses).subscribe(data=>{
      this.listaRecursos=data;
    });

    this.socioService.getSocioId(this.idsoc).subscribe(
      es=>{
        this.nombre = es.persona.no_persona;
        this.apepat = es.persona.ap_paterno;
        this.apemat = es.persona.ap_materno;
    });

    this.sesionService.getSesionId(this.idses).subscribe(
      es =>{
        this.tema = es.de_tema;
    });

  }

}
