import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AnunciosModule } from './anuncios/anuncios.module';
import { GestionAnuncioModule } from './componentes-bi/gestion-anuncio/gestion-anuncio.module';
import { GestionAnuncioComponent } from './componentes-bi/gestion-anuncio/view/gestion-anuncio/gestion-anuncio.component';
import { GestionModuloModule } from './componentes-bi/gestion-modulo/gestion-modulo.module';
import { GestionModuloComponent } from './componentes-bi/gestion-modulo/views/gestion-modulo/gestion-modulo.component';
import { GestionSeminarioModule } from './componentes-bi/gestion-seminario/gestion-seminario.module';
import { GestionSeminarioComponent } from './componentes-bi/gestion-seminario/view/gestion-seminario/gestion-seminario.component';
import { MenuInicioComponent } from './componentes-bi/menu-inicio/view/menu-inicio/menu-inicio.component';
import { ReporteModule } from './componentes-bi/reporte/reporte.module';
import { ReporteComponent } from './componentes-bi/reporte/view/reporte/reporte.component';
import { CoreModule } from './core/core.module';
import { PageLoginComponent } from './core/presentation/pages/page-login/page-login.component';
import { HistorialModulosComponent } from './historial-modulos/view/historial-modulos/historial-modulos.component';
import { PageMenu1Component } from './menu-principal1/presentation/pages/page-menu1/page-menu1.component';
import { PedidosOracionModule } from './pedidos-oracion/pedidos-oracion.module';
import { PrincipalModule } from './principal/principal.module';
import { PrincipalComponent } from './principal/view/principal/principal.component';
import { PrincipalbiModule } from './principalbi/principalbi.module';
import { PrincipalbiComponent } from './principalbi/view/principalbi/principalbi.component';
import { RecursosModule } from './recursos/recursos.module';
import { PageSesionComponent } from './sesiones/presentation/pages/page-sesion/page-sesion.component';
import { SesionesModule } from './sesiones/sesiones.module';

const routes : Routes = [
    {path: '', component:PageLoginComponent},

    {path: 'menuprincipal',
      component:PrincipalComponent,
      children:[
        {path: 'inicio', component:PageMenu1Component},
        {path: 'historialmodulos', component:HistorialModulosComponent},
  
      ]
    },
  
    {path: 'sesion/:id', component:PageSesionComponent},
  
    {path: 'moduloasesor/:id',
      loadChildren: () => import('./modulo-asesor/modulo-asesor.module').then((m) => m.ModuloAsesorModule)},
    

    {path: 'menuprincipal2',
      component:PrincipalbiComponent,
      children:[
        {path: 'inicio', component:MenuInicioComponent},
        {path: 'modulos',
        loadChildren: () => import('./componentes-bi/gestion-modulo/gestion-modulo.module').then((m) => m.GestionModuloModule)},
        {path: 'seminarios', component:GestionSeminarioComponent},
        {path: 'anuncios', component:GestionAnuncioComponent},
        {path: 'reportes', component:ReporteComponent},
      ]
    },

    {path: '**', component:PageLoginComponent}
    
]

@NgModule({
  imports: [
    CoreModule,
    RecursosModule,
    SesionesModule,
    PrincipalModule,
    PrincipalbiModule,
    GestionModuloModule,
    GestionSeminarioModule,
    GestionAnuncioModule,
    FormsModule,
    AnunciosModule,
    ReporteModule,
    SesionesModule,
    PedidosOracionModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }