import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaSociosModule } from '../lista-socios/lista-socios.module';
import { PageListaSocioComponent } from '../lista-socios/presentation/pages/page-lista-socio/page-lista-socio.component';
import { ListaSocioDetalleSesionesComponent } from '../lista-socios/presentation/views/lista-socio-detalle-sesiones/lista-socio-detalle-sesiones.component';
import { PageModuloAsesorComponent } from './presentation/pages/page-modulo-asesor/page-modulo-asesor.component';
import { TablaPedidoOracionComponent } from './presentation/views/tabla-pedido-oracion/tabla-pedido-oracion.component';

const routes: Routes = [
  {path: '', component:PageModuloAsesorComponent},
  {path: 'pedidosoracion', component:TablaPedidoOracionComponent},
  {path: 'socio',
    loadChildren: () => import('../lista-socios/lista-socios.module').then((n) => n.ListaSociosModule)},
];

@NgModule({
  imports: [
      ListaSociosModule,
      RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ModuloasesorRoutingModule { }