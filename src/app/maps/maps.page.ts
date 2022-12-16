import { Component, OnInit } from '@angular/core';
import * as Mapboxgl from 'mapbox-gl';
import { environment } from './../../environments/environment';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { MapBoxService, Feature  } from '../servicios/mapBox/map-box.service';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.page.html',
  styleUrls: ['./maps.page.scss'],
})
export class MapsPage implements OnInit {
  public map: Mapboxgl.Map;
  public start = [-70.70555523861034, -33.5988065509325];
  public style = 'mapbox://styles/mapbox/streets-v11';


  constructor(
    private geolocation: Geolocation,
    private mapboxService : MapBoxService) {
    Mapboxgl.accessToken = environment.MAPBOX_KEY,
    this.getGeoLocation();
  }

   addresses:string[] = [];
   selectedAddress = null;
   center : Array<any> = [];
   selectedCenter = null;


   search(event:any){
    const searchTerm = event.target.value.toLowerCase();
    if( searchTerm && searchTerm.length > 0){
      this.mapboxService
      .search_word(searchTerm)
      .subscribe((features : Feature[])=>{
        this.addresses = features.map(feat => feat.place_name)
      });
    }else{
      this.addresses = [];
      this.center = [];
    }
   }

   onSelect(address : string){
    this.selectedAddress = address;
    this.selectedCenter = this.center;
    this.mapboxService
      .search_word(address)
      .subscribe((features : Feature[])=>{
      features.map(center => console.log(center, 'soy center'))
      console.log(features, 'soyfeatures')

      });




    this.addresses = [];
    this.center = [];
  }

  ngOnInit() {



    this.map = new Mapboxgl.Map({
      container: 'mapa-box',
      style: this.style,
      zoom: 16,
      center: [
        -70.70555523861034, -33.5988065509325
      ]
        });
      this.crearMarcador(-70.70555523861034, -33.5988065509325);
  }

  crearMarcador(lng: number, lat: number){
    const marker = new Mapboxgl.Marker({
      draggable: true
      }).setLngLat([  -70.70555523861034, -33.5988065509325])
      .addTo(this.map);
      marker.on("dragend",()=>
      console.log(marker.getLngLat()))
  }

  crearMarcador2(lng: number, lat: number){
    const marker = new Mapboxgl.Marker({
      draggable: true,
      color: 'red'
      }).setLngLat([lat,lng])
      .addTo(this.map);
      marker.on("dragend",()=>
      console.log(marker.getLngLat()))
  }

  getGeoLocation(){
    this.geolocation.getCurrentPosition().then((resp) => {
      const latitude = resp.coords.latitude;
      const longitude = resp.coords.longitude;
      console.log("latitud", latitude);
      console.log("longitude", longitude);
      this.crearMarcador2(latitude, longitude);

      // resp.coords.latitude
      // resp.coords.longitude
     }).catch((error) => {
       console.log('Error getting location', error);
     });

     let watch = this.geolocation.watchPosition();
     watch.subscribe((data) => {
      // data can be a set of coordinates, or an error (if an error occurred).
      // data.coords.latitude
      // data.coords.longitude
     });
  }



}
