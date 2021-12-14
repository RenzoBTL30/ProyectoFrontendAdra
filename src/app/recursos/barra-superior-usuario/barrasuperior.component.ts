import { Component, OnInit } from '@angular/core';
import { PersonaService } from 'src/app/servicios/persona.service';

@Component({
  selector: 'adra-barrasuperior',
  templateUrl: './barrasuperior.component.html',
  styleUrls: ['../estilos/recursos.styles.css']
})

export class BarrasuperiorComponent implements OnInit {

  valor:any;
  Stringvalor:any;
  nombre:any = " ";
  apellido_paterno:any = " ";
 

  constructor(private personaService: PersonaService) {
  
  }

  ngOnInit(): void {
    this.obtenerDatosTokenDNI();
  }

  obtenerDatosTokenDNI():any{
        let token = sessionStorage.getItem('token');
        let tokenstring = JSON.stringify(token);
        let payload = JSON.parse(atob(tokenstring.split('.')[1]));

        //let dni;
        //dni = payload.user_name;
      
        let idusuario;
        idusuario = payload.idusuario;
        let id = parseInt(idusuario);
        
        this.personaService.getPersonaId(id).subscribe(
           es=>{
              this.nombre = es.no_persona;
              this.apellido_paterno = es.ap_paterno;
           }     
        );
  }  
}



