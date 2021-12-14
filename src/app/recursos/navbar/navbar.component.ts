import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/presentation/views/login/auth.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import swal from 'sweetalert2';


@Component({
  selector: 'adra-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['../estilos/recursos.styles.css']
})
export class NavbarComponent implements OnInit {
  
  rol:any

  constructor(public authService: AuthService, private router:Router) { }

  ngOnInit(): void {
    this.obtenerRol();
  }

  logout():void{
    let username = this.authService.usuario.nu_dni;
    this.authService.logout();
    swal.fire('Logout', `Hola ${username} has cerrado sesión con exito`, 'success');
    this.router.navigate(['/']);
  }

  obtenerRol():any{

    let usuario = this.authService.usuario;

    this.rol = usuario.roles[0];

  }  
}
