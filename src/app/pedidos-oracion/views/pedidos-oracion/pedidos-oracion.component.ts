import { Component, OnInit, ViewChild } from '@angular/core';
import { PedidoOracion } from 'src/app/models/pedido_oracion';
import { PedidooracionService } from 'src/app/servicios/pedidooracion.service';
import { SocioService } from 'src/app/servicios/socio.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'adra-pedidos-oracion',
  templateUrl: './pedidos-oracion.component.html',
  styleUrls: ['./pedidos-oracion.component.css']
})
export class PedidosOracionComponent implements OnInit {

  pedido:PedidoOracion = new PedidoOracion();
  idsocio:any;
  fechaActual:Date = new Date();


  @ViewChild('closebutton') closebutton:any;
  @ViewChild('descripcion') descripcion:any;

  constructor(private socioService: SocioService, private pedidoService: PedidooracionService) { }

  ngOnInit(): void {
    this.obtenerIdSocio();
  }

  crear(){
    this.pedido.fe_creacion = this.fechaActual;
    this.pedido.socio.id = this.idsocio;

    this.pedidoService.create(this.pedido).subscribe(
      res=>{
        this.closebutton.nativeElement.click()
        this.limpiar();
      }
    );
    Swal.fire('Completado', `El pedido ha sido registrado correctamente`, 'success')
  }

  limpiar(){
    this.descripcion.nativeElement.value = '';
  }

  obtenerIdSocio(){
    let token = sessionStorage.getItem('token');
    let tokenstring = JSON.stringify(token);
    let payload = JSON.parse(atob(tokenstring.split('.')[1]));

    //let dni;
    //dni = payload.user_name;
  
    let idusuario;
    idusuario = payload.idusuario;
    let id = parseInt(idusuario);
    console.log(id);

    this.socioService.getSocios().subscribe(data =>{
      let listSocios = data;


      let result = listSocios.find(x => x.persona.id == id);

      this.idsocio = result?.id;

    });
  }




}
