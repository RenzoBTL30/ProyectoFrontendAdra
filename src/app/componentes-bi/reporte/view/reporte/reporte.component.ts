import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BancoComunal } from 'src/app/models/banco_comunal';
import { Reporte1 } from 'src/app/models/reporte1';
import { Reporte2 } from 'src/app/models/reporte2';
import { Reporte3 } from 'src/app/models/reporte3';
import { Reporte4 } from 'src/app/models/reporte4';
import { Reporte5 } from 'src/app/models/reporte5';
import { Reporte6 } from 'src/app/models/reporte6';
import { BancocomunalService } from 'src/app/servicios/bancocomunal.service';
import { CapacitacionService } from 'src/app/servicios/capacitacion.service';
import { ReporteService } from 'src/app/servicios/reporte.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'adra-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.css']
})
export class ReporteComponent implements OnInit {

  bancosComunal: BancoComunal[]=[];

  reporte1:Reporte1[]=[];
  reporte2:Reporte2[]=[];
  reporte3:Reporte3[]=[];
  reporte4:Reporte4[]=[];
  reporte5:Reporte5[]=[];
  reporte6:Reporte6[]=[];

  validador:any;

  optionValue_a:any;
  idbancocomunal:any;
  tipReporteBanco:any;
  tipReporteUsuario:any;

  titulos1: string[]=["Nombre","Apellido Paterno","DNI","Estado"];
  titulos2: string[]=["Nombre","Apellido Paterno","DNI","Rol"];
  titulos3: string[]=["Capacitación","Nombre","Apellido Paterno","Recursos Vistos","Total de Recursos","Progreso"];
  titulos4: string[]=["Nombre","Apellido Paterno","Seminario","Comentario","Valoración"];
  titulos5: string[]=["Nombre","Apellido Paterno","Apellido Materno","Correo Electrónico","Teléfono","Banco Comunal","Asesor"];
  titulos6: string[]=["Capacitación","Banco Comunal","Valoración"];

  @ViewChild('table1') table1!: ElementRef;
  @ViewChild('table2') table2!: ElementRef;
  @ViewChild('table3') table3!: ElementRef;
  @ViewChild('table4') table4!: ElementRef;
  @ViewChild('table5') table5!: ElementRef;
  @ViewChild('table6') table6!: ElementRef;

  constructor(private bancocomunalService: BancocomunalService, private reporteService: ReporteService) { }

  ngOnInit(): void {
    this.listarBancos();
  }

  listarBancos(){
    this.bancocomunalService.getBancos().subscribe(data =>{
      this.bancosComunal= data;
    });
  }

  redondear(progreso:any){
    return Math.round(progreso*100)/100;
  }

  generar(){
    if (this.optionValue_a == 1) {
      if (this.tipReporteUsuario == 5) {

        this.validador=1;

        this.reporteService.getUsuariosActivos().subscribe(data =>{
          this.reporte1= data;
        });

      } else {
        if (this.tipReporteUsuario == 6) {

          this.validador=2;

          this.reporteService.getUsuariosRoles().subscribe(data =>{
            this.reporte2= data;
          });

        }

      }

    } else {
      if(this.optionValue_a == 2){
        if (this.tipReporteBanco == 1) {

          console.log(this.idbancocomunal);

          this.validador=5

          this.reporteService.getSociosporBanco(this.idbancocomunal).subscribe(data =>{
            this.reporte5= data;
          });
          
        } else {
          if (this.tipReporteBanco == 2) {
            
            this.validador=4

            this.reporteService.getReporteAsistSem(this.idbancocomunal).subscribe(data =>{
              this.reporte4= data;
            });

          } else {
            if (this.tipReporteBanco == 3) {
              
              this.validador=3

              this.reporteService.getReporteProgreso(this.idbancocomunal).subscribe(data =>{
                this.reporte3= data;
              });

            } else {
              if (this.tipReporteBanco == 4) {

                this.validador=6

                this.reporteService.getReporteSatisfac(this.idbancocomunal).subscribe(data =>{
                  this.reporte6= data;
                });
                
              } 
            }
            
          }

        }

      }

    }
  }

  descargarExcel(){
    console.log(this.validador);
    switch (this.validador) {
      case 1:
        const ws1: XLSX.WorkSheet=XLSX.utils.table_to_sheet(this.table1.nativeElement);
        const wb1: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb1, ws1, 'Sheet1');
    
        /* save to file */
        XLSX.writeFile(wb1, 'Reporte de Usuarios Activos.xlsx');
      break;
    
      case 2:
        const ws2: XLSX.WorkSheet=XLSX.utils.table_to_sheet(this.table2.nativeElement);
        const wb2: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb2, ws2, 'Sheet1');
    
        /* save to file */
        XLSX.writeFile(wb2, 'Reporte de Usuarios con Roles.xlsx');
      break;

      case 3:
        const ws3: XLSX.WorkSheet=XLSX.utils.table_to_sheet(this.table3.nativeElement);
        const wb3: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb3, ws3, 'Sheet1');
    
        /* save to file */
        XLSX.writeFile(wb3, 'Reporte de Progreso por Módulo.xlsx');
      break;
      case 4:
        const ws4: XLSX.WorkSheet=XLSX.utils.table_to_sheet(this.table4.nativeElement);
        const wb4: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb4, ws4, 'Sheet1');
    
        /* save to file */
        XLSX.writeFile(wb4, 'Reporte de Asistencia a Seminarios.xlsx');
      break;

      case 5:
        const ws5: XLSX.WorkSheet=XLSX.utils.table_to_sheet(this.table5.nativeElement);
        const wb5: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb5, ws5, 'Sheet1');
    
        /* save to file */
        XLSX.writeFile(wb5, 'Reporte de Socios por Banco Comunal.xlsx');
      break;
      case 6:
        const ws6: XLSX.WorkSheet=XLSX.utils.table_to_sheet(this.table6.nativeElement);
        const wb6: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb6, ws6, 'Sheet1');
    
        /* save to file */
        XLSX.writeFile(wb6, 'Reporte de Promedio de Valoración por Banco Comunal.xlsx');
      break;

      default:
      break;
    }

    
  }

}
