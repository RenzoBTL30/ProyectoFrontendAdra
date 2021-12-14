import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Capacitacion } from 'src/app/models/capacitacion';
import { Pregunta } from 'src/app/models/pregunta';
import { Recurso } from 'src/app/models/recurso';
import { Sesion } from 'src/app/models/sesion';
import { Tipo_Capacitacion } from 'src/app/models/tipo_capacitacion';
import { TipoRecurso } from 'src/app/models/tipo_recurso';
import { CapacitacionService } from 'src/app/servicios/capacitacion.service';
import { RecursoService } from 'src/app/servicios/recurso.service';
import { SesionService } from 'src/app/servicios/sesion.service';
import { TiporecursoService } from 'src/app/servicios/tiporecurso.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'adra-gestion-sesion',
  templateUrl: './gestion-sesion.component.html',
  styleUrls: ['./gestion-sesion.component.css']
})
export class GestionSesionComponent implements OnInit {

  capacitaciones: Capacitacion[]=[];
  sesiones: Sesion[]=[];
  recursos: Recurso[]=[];
  tiporecursos: TipoRecurso[]=[];
  tiporecursos_edit: TipoRecurso[]=[];
  htmlcontent:string="";

  @ViewChild('closebutton') closebutton:any;
  @ViewChild('closebutton2') closebutton2:any;

  @ViewChild('closebutton3') closebutton3:any;
  @ViewChild('closebutton4') closebutton4:any;

  @ViewChild('tema') tema:any;
  @ViewChild('fech_inicio') fecha_inicio:any;
  @ViewChild('fech_fin') fecha_fin:any;

  @ViewChild('tipo_rec') tipo_rec:any;
  @ViewChild('nombre_rec') nombre_rec:any;
  @ViewChild('url_rec') url_rec:any;

  @ViewChild('pregunta') pregunta?:ElementRef;

  constructor(private renderer: Renderer2,private capacitacionService: CapacitacionService, private router:Router, private sesionService: SesionService, private recursoService: RecursoService, private tiporec: TiporecursoService, private activatedRouter:ActivatedRoute) { 

    this.duplicado.textContent = "Hello World";

  }

  capacitacion: Capacitacion = new Capacitacion();
  sesion:Sesion = new Sesion();
  recurso:Recurso = new Recurso();

  sesion_edit:Sesion = new Sesion();
  recurso_edit:Recurso = new Recurso();

  nombre_cap:any;
  descrip_cap:any;
  id_cap:number = 0;
  validador1:boolean = false;

  cambiable2 = document.getElementById("cambiable2");

  duplicado = document.createElement("p");

  preguntas:Pregunta[]=[];


  ngOnInit(): void {
    this.listarCapacitacion();
    this.listarSesion();
    this.listarRecurso();
    this.listarTiposRecurso();
    
  }

  ngAfterViewInit() {
    this.pregunta?.nativeElement.insertAdjacentHTML('beforeend', '<div>Hola</div>');
  }

  crearSesion(){
    this.sesion.es_sesion="1";
    this.sesion.capacitacion.id=this.id_cap;

    this.capacitacionService.getCapacitacionId(this.id_cap).subscribe(
      es=>{
        this.capacitacion=es
        this.sesion.capacitacion.tipo_capacitacion.id = es.tipo_capacitacion.id

        this.sesionService.create(this.sesion).subscribe(
          res=>{
            this.closebutton.nativeElement.click()
            this.limpiarSesion();
            this.listarSesion();
          }
        );
      }
    );
    Swal.fire('Completado', `La sesión ha sido creada correctamente`, 'success')
  }

  listarSesion(){
    this.sesionService.getSesiones().subscribe(data =>{
      this.sesiones=data;
    });
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
              this.descrip_cap=es.de_capacitacion;
            }
          );
        }
      }
    )
  }

  listarRecurso(){
    this.recursoService.getRecursos().subscribe(data =>{
      this.recursos=data;
    });
  }

  listarTiposRecurso(){
    this.tiporec.getTiposRec().subscribe(data =>{
      this.tiporecursos=data;
    });
  }

  limpiarSesion(){
    this.tema.nativeElement.value = '';
    this.fecha_inicio.nativeElement.value = '';
    this.fecha_fin.nativeElement.value = '';
  }

  /*
  limpiarRecurso(){
    this.nombre_rec.nativeElement.value = '';
    this.url_rec.nativeElement.value = '';
  }*/

  deleteSesion(sesion: Sesion){
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
          'La sesión ha sido eliminada correctamente.',
          'success'
        )
        this.sesionService.deleteSesion(sesion).subscribe(
          res=>this.listarSesion()
        );
      }
    })
  }

  cargarDatosSesion(id:number){
    this.sesionService.getSesionId(id).subscribe(
      es=>{
        this.sesion_edit=es;
      }
    );
  }

  editarSesion(){
    this.sesionService.update(this.sesion_edit).subscribe(
      res=>{
        this.closebutton2.nativeElement.click()
        this.listarSesion();
      }
    );
    Swal.fire('Completado', `La sesión ha sido editada correctamente`, 'success')
  }


  createRecurso(){
    this.recurso.nu_orden=0;
    this.recurso.es_recurso='1';

    console.log(this.recurso);

        this.recursoService.create(this.recurso).subscribe(
          res=>{
            console.log(res);
            if (res.tipo_recurso.id == 4) {
              console.log(res.tipo_recurso.id);
            }
            this.closebutton3.nativeElement.click();
            this.listarRecurso();
            this.listarTiposRecurso();
          }
        );

      Swal.fire('Completado', `El recurso ha sido creado correctamente`, 'success')
  }

  enviarSesionID(id:number){
    this.recurso.sesion.id = id;
  }

  deleteRecurso(recurso: Recurso){
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
          'El recurso ha sido eliminado correctamente',
          'success'
        )
        this.recursoService.deleteRecurso(recurso).subscribe(
          res=>this.listarRecurso()
        );
      }
    })
  }

  cargarDatosRecurso(id:number){
    this.recursoService.getRecursoId(id).subscribe(
      es=>{
        this.recurso_edit=es;
      }
    );
  }

  editarRecurso(){
    console.log(this.recurso_edit);

    this.recursoService.update(this.recurso_edit).subscribe(
      res=>{
        console.log(res);
        this.closebutton4.nativeElement.click()
        this.listarRecurso();
        this.listarTiposRecurso();
      }
    );
    Swal.fire('Completado', `El recurso ha sido modificado correctamente`, 'success')
  }

  verificarPost(){

  }

  getSelectedValue(event:any) {
    console.log("; Display: " + event.target[event.target.selectedIndex].text + ".");
    if (event.target[event.target.selectedIndex].text == 'Evaluación') {
      this.validador1 = true
    } else {
      this.validador1 = false
    }
  }

  // Pregunta

  agregarPregunta(){

  }

  crearPregunta(){

  }



  // Alternativa

}
