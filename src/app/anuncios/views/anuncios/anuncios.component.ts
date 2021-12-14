import { Component, OnInit } from '@angular/core';
import { AnuncioService } from 'src/app/servicios/anuncio.service';

@Component({
  selector: 'adra-anuncios',
  templateUrl: './anuncios.component.html',
  styleUrls: ['./anuncios.component.css']
})
export class AnunciosComponent implements OnInit {

  constructor(private anuncioService: AnuncioService) { }

  ngOnInit(): void {
  }

  

}
