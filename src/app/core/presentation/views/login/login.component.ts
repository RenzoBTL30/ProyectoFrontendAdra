import { ProviderAst } from '@angular/compiler';
import { Component, Inject, Input, OnInit, Pipe } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { BarrasuperiorComponent } from 'src/app/recursos/barra-superior-usuario/barrasuperior.component';
import { RecursosModule } from 'src/app/recursos/recursos.module';
import swal from 'sweetalert2';
import { AuthService } from './auth.service';


@Component({
  selector: 'adra-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[BarrasuperiorComponent]
})

export class LoginComponent implements OnInit {
  usuario: Usuario;
  constructor(private authService: AuthService, private router:Router, private barrasuperior: BarrasuperiorComponent ) { 
    this.usuario = new Usuario();
  }

  ngOnInit(): void {

  }
  login():void{

    this.authService.login(this.usuario).subscribe(response =>{
      console.log(response);
      this.authService.guardarUsuario(response.access_token);
      this.authService.guardarToken(response.access_token);

      let usuario = this.authService.usuario;
      
      if (usuario.roles[0] == 'Socio' || usuario.roles[0] == 'Asesor') {
        this.router.navigate(['/menuprincipal/inicio']);
      } else if (usuario.roles[0] == 'JefeBI'){
        this.router.navigate(['/menuprincipal2/inicio']);
      } else {
        this.router.navigate(['/menuprincipal2/inicio']);
      }

      console.log(JSON.stringify(sessionStorage.getItem('usuario')));
      
     

      swal.fire('Login', `Hola ${usuario.nu_dni}, has iniciado sesión con exito!`)
    },error=>{
        if(error.status == 400){
          swal.fire('Error Login', 'Usuario o clave Incorrecta', 'error');
        }
    }  
    );
  }
  
}
