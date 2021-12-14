import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Capacitacion } from 'src/app/models/capacitacion';
import { listarPedidosBancoAsesor } from 'src/app/models/listapedidoAsesor';
import { CapacitacionService } from 'src/app/servicios/capacitacion.service';
import { PedidooracionService } from 'src/app/servicios/pedidooracion.service';

@Component({
  selector: 'adra-tabla-pedido-oracion',
  templateUrl: './tabla-pedido-oracion.component.html',
  styleUrls: ['./tabla-pedido-oracion.component.css']
})
export class TablaPedidoOracionComponent implements OnInit {

  listPedidosBancoAsesor: listarPedidosBancoAsesor[]=[];
  id_cap:any;
  capacitacion:Capacitacion= new Capacitacion();
  nombre_cap:any;

  constructor(private capacitacionService: CapacitacionService, private pedidoService: PedidooracionService, private activatedRouter:ActivatedRoute ) { }

  ngOnInit(): void {
    this.listarPedidos();
    this.listarCapacitacion();
  }

  listarPedidos(){
    let token = sessionStorage.getItem('token');
    let tokenstring = JSON.stringify(token);
    let payload = JSON.parse(atob(tokenstring.split('.')[1]));
  
    let idusuario;
    idusuario = payload.idusuario;
    let id = parseInt(idusuario);

    this.pedidoService.getlistarPedidosBancoAsesorId(id).subscribe(data =>{
      this.listPedidosBancoAsesor=data;
    })
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

}
