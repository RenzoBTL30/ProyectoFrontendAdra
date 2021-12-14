import { DatePipe, formatDate } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Capacitacion } from 'src/app/models/capacitacion';
import { Recurso } from 'src/app/models/recurso';
import { SeminarioList } from 'src/app/models/seminarioList';
import { Sesion } from 'src/app/models/sesion';
import { Tipo_Capacitacion } from 'src/app/models/tipo_capacitacion';
import { CapacitacionService } from 'src/app/servicios/capacitacion.service';
import { RecursoService } from 'src/app/servicios/recurso.service';
import { SesionService } from 'src/app/servicios/sesion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'adra-gestion-seminario',
  templateUrl: './gestion-seminario.component.html',
  styleUrls: ['./gestion-seminario.component.css'],
  providers: [DatePipe]
})
export class GestionSeminarioComponent implements OnInit {

  seminarios: SeminarioList[]=[];
  capacitaciones: Capacitacion[]=[];

  seminarios_edit: SeminarioList[]=[];

  @ViewChild('closebutton') closebutton:any;
  @ViewChild('closebutton2') closebutton2:any;

  @ViewChild('nombre_capacitacion') nombre_capacitacion:any;
  @ViewChild('tema') tema:any;
  @ViewChild('fech_inicio') fech_inicioEtiq:any;
  //@ViewChild('hor_inicio') hor_inicioEtiq:any;
  @ViewChild('fech_fin') fech_finEtiq:any;
  //@ViewChild('hor_fin') hor_finEtiq:any;
  @ViewChild('url') url:any;

  @ViewChild('descripcion') descripcion:any;

  @ViewChild('nombre_cap_edit') nombre_cap_edit:any;
  @ViewChild('tema_edit') tema_edit:any;




  constructor(private miDatePipe: DatePipe, private capacitacionService: CapacitacionService,private sesionService: SesionService,private recursoService: RecursoService) {

  }
  
  capacitacion: Capacitacion = new Capacitacion();
  sesion:Sesion = new Sesion();
  recurso:Recurso = new Recurso();

  capacitacion_editar: Capacitacion = new Capacitacion();
  sesion_editar: Sesion = new Sesion();
  recurso_editar: Recurso = new Recurso();

  tipo_capacitacion: Tipo_Capacitacion = new Tipo_Capacitacion();
  

  ngOnInit(): void {
    this.capacitacionService.getSeminarios().subscribe(data =>{
      this.seminarios= data;
    });

    this.capacitacion.tipo_capacitacion.id = 2;
    this.capacitacion.tipo_capacitacion.no_tipo_capacitacion = "Seminario";

    this.capacitacion_editar.tipo_capacitacion.id = 2;
    this.capacitacion_editar.tipo_capacitacion.no_tipo_capacitacion = "Seminario";
  }

  crear(){
    this.capacitacion.de_capacitacion=this.nombre_capacitacion.nativeElement.value;
    
    this.capacitacionService.create(this.capacitacion).subscribe(
      res=>{
        this.crearSesion();
      }
    );
  }

  crearSesion(){
        this.sesion.de_tema=this.tema.nativeElement.value;
        this.sesion.nu_orden=0;
        this.sesion.es_sesion="1";

        this.capacitacionService.getCapacitaciones().subscribe(data =>{
          this.capacitaciones= data;
          this.sesion.capacitacion.id=data[data.length-1].id
          this.sesion.capacitacion.tipo_capacitacion.id=data[data.length-1].tipo_capacitacion.id
          
          this.sesionService.create(this.sesion).subscribe(
            res=>{
             this.crearRec();
            }
          );
        });

        
  }

  crearRec(){
    this.recurso.no_recurso=this.capacitacion.no_capacitacion;
    this.recurso.nu_orden=0;
    this.recurso.es_recurso='1';

      this.sesionService.getSesiones().subscribe(data =>{
        this.recurso.sesion.id = data[data.length-1].id;

        //Este campo puede variar en la instancia
        this.recurso.tipo_recurso.id = 3
        this.recursoService.create(this.recurso).subscribe(
          res=>{
            this.closebutton.nativeElement.click()
            this.listar();
            this.limpiar();
          }
        );
      });

      this.listar();
      Swal.fire('Completado', `El seminario ha sido creado correctamente`, 'success')
  }
  
  

  listar(){
    this.capacitacionService.getSeminarios().subscribe(data =>{
      this.seminarios=data;
    });
  }

  limpiar(){
    this.nombre_capacitacion.nativeElement.value = '';
    this.tema.nativeElement.value = '';
    this.fech_inicioEtiq.nativeElement.value = '';
    this.fech_finEtiq.nativeElement.value = '';
    this.url.nativeElement.value = '';
  }

  delete(seminario:SeminarioList){
    console.log('Delete');

    Swal.fire({
      title: '¿Estás seguro?',
      text: "Esta operación no podrá ser revertida",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'El seminario ha sido eliminado correctamente.',
          'success'
        )
        this.capacitacionService.deleteSeminario(seminario).subscribe(
          res=>this.listar()
        );
      }
    })
  }  

  cargarDatos(index:number){
    this.capacitacionService.getSeminarios().subscribe(data =>{
      this.seminarios= data;
      this.capacitacion_editar.no_capacitacion=data[index].Nombre;
      this.sesion_editar.de_tema=data[index].Tema;
      //this.sesion_edit.fe_inicio= new Date(data[index].FechaInicio);
      //this.miDatePipe.transform(this.sesion_edit.fe_inicio, "YYYY-MM-ddThh:mm");
      this.recurso_editar.di_url=data[index].Direccion;

      //console.log(data);
      //console.log(index);

      this.capacitacion_editar.id = data[index].Id_cap;
      this.sesion_editar.id = data[index].Id_ses;
      this.recurso_editar.id = data[index].Id_rec;

    });
  }
  
  editar(){

    this.capacitacion_editar.de_capacitacion=this.nombre_cap_edit.nativeElement.value; 
    this.capacitacionService.getCapacitacionId(this.capacitacion_editar.id).subscribe(
      es=>{
        this.capacitacion_editar.ca_recursos=es.ca_recursos;
        this.capacitacion_editar.es_capacitacion=es.es_capacitacion;
        this.capacitacion_editar.tipo_capacitacion.id=es.tipo_capacitacion.id;
        this.capacitacion_editar.tipo_capacitacion.no_tipo_capacitacion=es.tipo_capacitacion.no_tipo_capacitacion;
      
        this.capacitacionService.update(this.capacitacion_editar).subscribe(
          res=>{
            this.editarSes();    
          }
        );
      }
    );

    
  }

  editarSes(){
    this.sesionService.getSesionId(this.sesion_editar.id).subscribe(
      es=>{
        this.sesion_editar.nu_orden=es.nu_orden;
        this.sesion_editar.ca_recursos=es.ca_recursos;
        this.sesion_editar.es_sesion=es.es_sesion;
        this.sesion_editar.capacitacion.id=es.capacitacion.id;
        this.sesion_editar.capacitacion.no_capacitacion=es.capacitacion.no_capacitacion;
        this.sesion_editar.capacitacion.de_capacitacion=es.capacitacion.de_capacitacion;
        this.sesion_editar.capacitacion.ca_recursos=es.capacitacion.ca_recursos;
        this.sesion_editar.capacitacion.es_capacitacion=es.capacitacion.es_capacitacion;
        this.sesion_editar.capacitacion.tipo_capacitacion.id=es.capacitacion.tipo_capacitacion.id;
        this.sesion_editar.capacitacion.tipo_capacitacion.no_tipo_capacitacion=es.capacitacion.tipo_capacitacion.no_tipo_capacitacion;
        
        this.sesionService.update(this.sesion_editar).subscribe(
          res=>{
            this.editarRec();
          }
        );
      }
    );

    
  }

  editarRec(){
    //El id ya esta
    
    this.recursoService.getRecursoId(this.recurso_editar.id).subscribe(
      es=>{
        this.recurso_editar.no_recurso=es.sesion.capacitacion.no_capacitacion;
        this.recurso_editar.nu_orden=es.nu_orden;
        this.recurso_editar.es_recurso=es.es_recurso;
        this.recurso_editar.sesion.id=es.sesion.id;
        this.recurso_editar.sesion.de_tema=es.sesion.de_tema;
        this.recurso_editar.sesion.fe_inicio=es.sesion.fe_inicio;
        this.recurso_editar.sesion.fe_fin=es.sesion.fe_fin;
        this.recurso_editar.sesion.nu_orden=es.sesion.nu_orden;
        this.recurso_editar.sesion.ca_recursos=es.sesion.ca_recursos;
        this.recurso_editar.sesion.es_sesion=es.sesion.es_sesion;
        this.recurso_editar.sesion.capacitacion.id=es.sesion.capacitacion.id;
        this.recurso_editar.sesion.capacitacion.no_capacitacion=es.sesion.capacitacion.no_capacitacion;
        this.recurso_editar.sesion.capacitacion.de_capacitacion=es.sesion.capacitacion.de_capacitacion;
        this.recurso_editar.sesion.capacitacion.ca_recursos=es.sesion.capacitacion.ca_recursos;
        this.recurso_editar.sesion.capacitacion.es_capacitacion=es.sesion.capacitacion.es_capacitacion;
        this.recurso_editar.sesion.capacitacion.tipo_capacitacion.id=es.sesion.capacitacion.tipo_capacitacion.id;
        this.recurso_editar.sesion.capacitacion.tipo_capacitacion.no_tipo_capacitacion=es.sesion.capacitacion.tipo_capacitacion.no_tipo_capacitacion;

        this.recursoService.update(this.recurso_editar).subscribe(
          res=>{
            this.closebutton2.nativeElement.click()
            this.listar();
            this.limpiar();
          }
        );
      }
    );
    this.listar();
    Swal.fire('Completado', `El seminario ha sido editado correctamente`, 'success')
  }
  
}
