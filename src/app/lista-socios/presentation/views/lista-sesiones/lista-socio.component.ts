import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListaProgresoPorSesiones } from 'src/app/models/listaProgresoPorSesiones';
import { PersonaService } from 'src/app/servicios/persona.service';
import { SocioService } from 'src/app/servicios/socio.service';

@Component({
  selector: 'adra-lista-socio',
  templateUrl: './lista-socio.component.html',
  styleUrls: ['./lista-socio.component.css']
})
export class ListaSocioComponent implements OnInit {

  idsoc:any;
  idcap:any;
  nombre:any;
  apepat:any;
  apemat:any;

  listaProgresoPorSesiones:ListaProgresoPorSesiones[]=[];

  constructor(private socioService: SocioService, private activatedRouter:ActivatedRoute, private personaService: PersonaService) { }

  ngOnInit(): void {
    this.listarSesionesProg();
  }

  listarSesionesProg(){
    this.activatedRouter.params.subscribe(
      e=>{
        let id=e['id'];
        this.idsoc = id;
        
        let id2=e['idcap'];
        this.idcap = id2;

    });

    this.personaService.getListaProgresoPorSesiones(this.idsoc, this.idcap).subscribe(data=>{
      this.listaProgresoPorSesiones=data;
    });

    this.socioService.getSocioId(this.idsoc).subscribe(
      es=>{
        this.nombre = es.persona.no_persona;
        this.apepat = es.persona.ap_paterno;
        this.apemat = es.persona.ap_materno;
    });

  }




}
