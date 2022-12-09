import { Component, OnInit } from '@angular/core';
import * as Mapboxgl from 'mapbox-gl';

import { environment } from './../../environments/environment';


@Component({
  selector: 'app-maps',
  templateUrl: './maps.page.html',
  styleUrls: ['./maps.page.scss'],
})
export class MapsPage implements OnInit {
  public map: Mapboxgl.Map;
  public start = [-70.70555523861034, -33.5988065509325];

  public style = 'mapbox://styles/mapbox/streets-v11';

  constructor() {
    Mapboxgl.accessToken = environment.MAPBOX_KEY
  }


  ngOnInit() {


  }

  ionViewWillEnter() {
    if(!this.map){
      this.buildMap();
      this.crearMarcador(-70.70555523861034, -33.5988065509325);
    }
  }

  buildMap(){
  this.map = new Mapboxgl.Map({
  container: 'mapa-box',
  style: this.style,
  zoom: 16,
  center: [
    -70.70555523861034, -33.5988065509325
  ]
    });

  }
  crearMarcador(lng: number, lat: number){
    const marker = new Mapboxgl.Marker({
      draggable: true
    }).setLngLat([lng, lat])
    .addTo( this.map );

  }

}
