import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { concat } from 'rxjs';
import { BancoComunal } from 'src/app/models/banco_comunal';
import { Capacitacion } from 'src/app/models/capacitacion';
import { Listadoafil } from 'src/app/models/listadoafil';
import { SeminarioList } from 'src/app/models/seminarioList';
import { Tipo_Capacitacion } from 'src/app/models/tipo_capacitacion';
import { AfiliacionService } from 'src/app/servicios/afiliacion.service';
import { BancocomunalService } from 'src/app/servicios/bancocomunal.service';
import { CapacitacionService } from 'src/app/servicios/capacitacion.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'adra-gestion-modulo',
  templateUrl: './gestion-modulo.component.html',
  styleUrls: ['./gestion-modulo.component.css']
})
export class GestionModuloComponent implements OnInit {

  capacitaciones: Capacitacion[]=[];
  bancos: BancoComunal[]=[];
  seminarios: SeminarioList[]=[];

  bancostemp: BancoComunal = new BancoComunal();
  capacitacionestemp: Capacitacion = new Capacitacion();

  idbancocomunal:any;
  idcap1:any;
  idcap2:any;

  listaidBancos:any[]=[];
  listaidCapac:any[]=[];


  listadotemporalBancos: any[]=[];
  listadotemporalCapac: any[]=[];
  
  contador = 0;
  @ViewChild('closebutton') closebutton:any;
  @ViewChild('closebutton2') closebutton2:any;
  @ViewChild('closebutton3') closebutton3:any;
  
  @ViewChild('nombre') nombre:any;
  @ViewChild('descripcion') descripcion:any;

  @ViewChild('nombre_edit') nombre_edit:any;
  @ViewChild('descripcion_edit') descripcion_edit:any;

  @ViewChild('elemento1') elemento1?: ElementRef;

  constructor(private afilService: AfiliacionService, private capacitacionService: CapacitacionService, private router:Router, private bancoService: BancocomunalService, private renderer: Renderer2) {
    
  }
  
  capacitacion: Capacitacion = new Capacitacion();
  tipo_capacitacion: Tipo_Capacitacion = new Tipo_Capacitacion();

  capacitacion_editar: Capacitacion = new Capacitacion();

  ngOnInit(): void {
    this.capacitacionService.getCapacitaciones().subscribe(data =>{
      this.capacitaciones= data;

    });
    this.capacitacion.tipo_capacitacion.id = 1;
    this.capacitacion.tipo_capacitacion.no_tipo_capacitacion = "Modulo";
  }

  onKey(event: any){
    this.contador = event.target.value.length;
  }

  crear(){
    this.capacitacionService.create(this.capacitacion).subscribe(
      res=>{
        this.closebutton.nativeElement.click()
        this.listar();
        this.limpiar();
      }
    );
    Swal.fire('Completado', `El modulo ha sido creado correctamente`, 'success')
  }

  listar(){
    this.capacitacionService.getCapacitaciones().subscribe(data =>{
      this.capacitaciones= data;
    });
  }

  listarBancos(){
    this.listarSeminarios();
    this.bancoService.getBancos().subscribe(data =>{
      this.bancos= data;
    });
  }

  listarSeminarios(){
    this.capacitacionService.getSeminarios().subscribe(data =>{
      this.seminarios= data;
    });
  }

  limpiar(){
    this.nombre.nativeElement.value = '';
    this.descripcion.nativeElement.value = '';
    this.contador = 0;
  }

  delete(capacitacion:Capacitacion){
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
          'El módulo ha sido eliminado correctamente.',
          'success'
        )
        this.capacitacionService.delete(capacitacion).subscribe(
          res=>this.listar()
        );
      }
    })
  }  

  cargarDatos(id:number){
    this.capacitacionService.getCapacitacionId(id).subscribe(
      es=>{
        //Esta linea es la que remplaza los datos en el ngModel
        this.capacitacion_editar=es

        let nombre = es.no_capacitacion;
        let descripcion = es.de_capacitacion;
        
        this.nombre_edit.nativeElement.value = nombre;
        this.descripcion_edit.nativeElement.value = descripcion
      }
    );
  }

  editar(){
    this.capacitacionService.update(this.capacitacion_editar).subscribe(
      res=>{
        this.closebutton2.nativeElement.click()
        this.listar();
      }
    );
    Swal.fire('Completado', `El modulo ha sido editado correctamente`, 'success')
  }

  asignar(){
    this.afilService.asignar(this.listaidCapac.toString(),this.listaidBancos.toString()).subscribe();
    
    this.closebutton3.nativeElement.click();
    Swal.fire('Completado', `Las capacitaciones fueron asignadas correctamente`, 'success')
    
  }

  enviarseleccionadoBancos(id:number){
    console.log(id);

    this.bancoService.getBancoId(id).subscribe(
      es=>{

        if (this.listadotemporalBancos.includes(es.no_banco_comunal)) {
          alert("Ya existe este elemento")
        } else {
          this.listadotemporalBancos.push(es.no_banco_comunal);
          this.listaidBancos.push(es.id);
        }
        

      }
    );  
  }

  enviarseleccionadoCapac(id:number){
    console.log(id);

    this.capacitacionService.getCapacitacionId(id).subscribe(
      es=>{
        if (this.listadotemporalCapac.includes(es.no_capacitacion)) {
          alert("Ya existe este elemento")
        } else {
          this.listadotemporalCapac.push(es.no_capacitacion);
          this.listaidCapac.push(es.id);
        }
        
      }
    );

  }

  eliminarseleccionadoBancos(id:number){
    delete this.listadotemporalBancos[id];
  }

  eliminarseleccionadoCapac(id:number){
    delete this.listadotemporalCapac[id];
  }

}
