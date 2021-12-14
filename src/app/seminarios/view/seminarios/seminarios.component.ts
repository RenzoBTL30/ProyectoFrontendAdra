import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/core/presentation/views/login/auth.service';
import { Afiliacion } from 'src/app/models/afiliacion';
import { ControlVista } from 'src/app/models/control_vista';
import { SeminarioList } from 'src/app/models/seminarioList';
import { SesionSocio } from 'src/app/models/sesion_socio';
import { AfiliacionService } from 'src/app/servicios/afiliacion.service';
import { CapacitacionService } from 'src/app/servicios/capacitacion.service';
import { ControlvistaService } from 'src/app/servicios/controlvista.service';
import { SesionsocioService } from 'src/app/servicios/sesionsocio.service';
import { SocioService } from 'src/app/servicios/socio.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'adra-seminarios',
  templateUrl: './seminarios.component.html',
  styleUrls: ['./seminarios.component.css']
})
export class SeminariosComponent implements OnInit {

  seminarios: SeminarioList[]=[];
  afiliaciones: Afiliacion[]=[];

  control_vista:ControlVista= new ControlVista();

  rol:any
  hoy:Date = new Date();
  fecha:any;
  hora:any;
  idafiliacion:any;
  idsocio:any;
  idsesion:any;
  idcapac:any;
  valoracion:any;

  fechaActual:Date=new Date();
  sesion_socio:SesionSocio = new SesionSocio();

  validador:any;
  validador2:number = 0;
  validador3:any;


  @ViewChild('muysatisfecho') muysatis?: ElementRef;
  @ViewChild('closebutton') closebutton:any;

  @ViewChild('color_cambiar') colorcamb!: ElementRef;


  constructor(private renderer:Renderer2, private controlService: ControlvistaService,private socioService: SocioService, private afiliacionService: AfiliacionService,private sesionsocioService: SesionsocioService, private authService: AuthService, private capacitacionService: CapacitacionService) {
    
   }

  ngOnInit(): void {
    this.obtenerRol();
    this.listarSeminarios();
  }

  listarSeminarios(){
    this.capacitacionService.getSeminarios().subscribe(data =>{
      this.seminarios=data;
    });
  }
  
  obtenerRol():any{

    let usuario = this.authService.usuario;
    this.rol = usuario.roles[0];

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

  mostrarEncuesta(event:any){
    setTimeout(() => {
      this.validador2=1;
    }, 5000);


  }

  mostrarEncuestaFinalizada(){
    setTimeout(() => {
      this.renderer.addClass(this.colorcamb.nativeElement, "link-terminado");
      this.validador2=2;
    }, 2000);

  }

  finalizarEncuesta(){

  }

  contador = 0;
  onKey(event: any){
    this.contador = event.target.value.length;
  }

  enviarvaloracion(valor:number){
    console.log("Valoracion = " + valor);

    this.valoracion = valor;
    console.log("idafiliacion para valoracion: " + this.idafiliacion);
    console.log("idsesion para valoracion: " + this.idsesion);
    console.log("idcap para valoracion: " + this.idcapac);
    this.control_vista.recurso.tipo_recurso.id=3;

    this.sesionsocioService.updatevaloracion(this.idafiliacion, this.idsesion, this.valoracion, this.control_vista.de_comentario).subscribe(
      res=>{
        this.closebutton.nativeElement.click();
        this.mostrarEncuestaFinalizada();
          }
        );
     
    Swal.fire('Completado', `La valoración ha sido registrada correctamente`, 'success')
    
  }

  obteneridSesion(idses: number, idcap: number){

    let token = sessionStorage.getItem('token');
    let tokenstring = JSON.stringify(token);
    let payload = JSON.parse(atob(tokenstring.split('.')[1]));

  
    let idusuario;
    idusuario = payload.idusuario;
    let id = parseInt(idusuario);
    console.log(id);

    this.socioService.getSocios().subscribe(data =>{
      let listSocios = data;

      let result = listSocios.find(x => x.persona.id == id);

      this.idsocio = result?.id;
      console.log("idsocio para buscar valoracion: " + this.idsocio)

    });
    
    this.afiliacionService.getAfiliaciones().subscribe(data =>{
      this.afiliaciones= data;
      
      let result = this.afiliaciones.find(x => x.socio.id == this.idsocio && x.capacitacion.id == this.idcapac);

      this.idafiliacion = result?.id;
      console.log("idafiliacion para valoracion: " + this.idafiliacion)

    });

    console.log("idafiliacion para valoracion: " + this.idafiliacion);

    this.idsesion = idses;
    this.idcapac = idcap;
    //console.log("idsesion para valoracion: " + this.idsesion);
    //console.log("idcap para valoracion: " + this.idcapac);

    //console.log("valoracion lista para enviar: " + this.valoracion)

    //this.sesionsocioService.updatevaloracion(this.idafiliacion, this.idsesion);
  }

  
}
