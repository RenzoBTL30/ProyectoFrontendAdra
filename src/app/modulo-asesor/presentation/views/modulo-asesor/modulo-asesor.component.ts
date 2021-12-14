import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/core/presentation/views/login/auth.service';
import { Capacitacion } from 'src/app/models/capacitacion';
import { ListaSociosModuloAsesor } from 'src/app/models/listasociosModuloAsesor';
import { Socio } from 'src/app/models/socio';
import { AfiliacionService } from 'src/app/servicios/afiliacion.service';
import { CapacitacionService } from 'src/app/servicios/capacitacion.service';
import { PersonaService } from 'src/app/servicios/persona.service';
import { SesionService } from 'src/app/servicios/sesion.service';
import { SesionsocioService } from 'src/app/servicios/sesionsocio.service';
import { SocioService } from 'src/app/servicios/socio.service';

@Component({
  selector: 'adra-modulo-asesor',
  templateUrl: './modulo-asesor.component.html',
  styleUrls: ['./modulo-asesor.component.css']
})
export class ModuloAsesorComponent implements OnInit {

  id_cap:any;
  nombre_cap:any;
  capacitacion: Capacitacion = new Capacitacion();

  socios:Socio[]=[];
  listaSociosModuloAsesor:ListaSociosModuloAsesor[]=[];

  constructor(private activatedRouter:ActivatedRoute, private personaService:PersonaService, public datepipe:DatePipe, private sesionService: SesionService, private sesionsocioService: SesionsocioService,private afiliacionService: AfiliacionService, private socioService: SocioService, private authService: AuthService, private capacitacionService: CapacitacionService) { }

  ngOnInit(): void {
    this.listarCapacitacion();
    this.listarSociosModuloAsesor();
  }

  listarCapacitacion(){
    this.activatedRouter.params.subscribe(
      e=>{
        let id=e['id'];
        this.id_cap = id;
        if (id) {
          this.capacitacionService.getCapacitacionId(id).subscribe(
            es=>{
              this.capacitacion=es
              this.nombre_cap=es.no_capacitacion;
            }
          );
        }
      }
    )
  }

  listarParticipantes(){
    this.socioService.getSocios().subscribe(data=>{
      this.socios=data
    });
  }

  listarSociosModuloAsesor(){

    let token = sessionStorage.getItem('token');
    let tokenstring = JSON.stringify(token);
    let payload = JSON.parse(atob(tokenstring.split('.')[1]));
  
    let idusuario;
    idusuario = payload.idusuario;
    let id = parseInt(idusuario);

    this.personaService.getlistaSociosModuloAsesor(this.id_cap, id).subscribe(data=>{
      this.listaSociosModuloAsesor=data;
    });
  }
}
