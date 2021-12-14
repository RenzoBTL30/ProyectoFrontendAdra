import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'adra-menu-inicio',
  templateUrl: './menu-inicio.component.html',
  styleUrls: ['./menu-inicio.component.css']
})
export class MenuInicioComponent implements OnInit {
  opened: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  toggleSidebar() {
      this.opened = !this.opened;
    }

}
