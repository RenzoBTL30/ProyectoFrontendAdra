import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Anuncio } from 'src/app/models/anuncio';
import { AnuncioService } from 'src/app/servicios/anuncio.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'adra-gestion-anuncio',
  templateUrl: './gestion-anuncio.component.html',
  styleUrls: ['./gestion-anuncio.component.css']
})
export class GestionAnuncioComponent implements OnInit {

  anuncios: Anuncio[]=[];

  @ViewChild('closebutton') closebutton:any;
  @ViewChild('closebutton2') closebutton2:any;

  @ViewChild('nombre') nombre:any;
  @ViewChild('fecha_inicio') fech_inicio:any;
  @ViewChild('fecha_fin') fech_fin:any;
  @ViewChild('url') url:any;



  constructor(private anuncioService: AnuncioService) { }

  anuncio: Anuncio = new Anuncio();
  anuncio_editar: Anuncio = new Anuncio();


  ngOnInit(): void {
    this.anuncioService.getAnuncios().subscribe(data =>{
      this.anuncios= data;
    });
  }

  crear(){
    this.anuncioService.create(this.anuncio).subscribe(
      res=>{
        this.closebutton.nativeElement.click()
        this.listar();
        this.limpiar();
      }
    );
    Swal.fire('Completado', `El anuncio ha sido creado correctamente`, 'success')
  }

  listar(){
    this.anuncioService.getAnuncios().subscribe(data =>{
      this.anuncios= data;
    });
  }

  
  limpiar(){
    this.nombre.nativeElement.value = '';
    this.fech_inicio.nativeElement.value = '';
    this.fech_fin.nativeElement.value = '';
    this.url.nativeElement.value = '';
  }
  

  delete(anuncio:Anuncio){
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
          'El anuncio ha sido eliminado correctamente.',
          'success'
        )
        this.anuncioService.delete(anuncio.id).subscribe(
          res=>this.listar()
        );
      }
    })
  }  

  
  cargarDatos(id:number){
    this.anuncioService.getAnuncioId(id).subscribe(
      es=>{
        //Esta linea es la que remplaza los datos en el ngModel
        this.anuncio_editar=es;
      }
    );
  }

  editar(){
    this.anuncioService.update(this.anuncio_editar).subscribe(
      res=>{
        this.closebutton2.nativeElement.click()
        this.listar();
      }
    );
    Swal.fire('Completado', `El anuncio ha sido editado correctamente`, 'success')
  }

}
