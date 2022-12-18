import { Component, OnInit } from '@angular/core';
import * as Mapboxgl from 'mapbox-gl';
import { environment } from './../../environments/environment';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { MapBoxService, Feature  } from '../servicios/mapBox/map-box.service';
import { HttpClient } from '@angular/common/http';
import { FirestoreService} from '../servicios/DB/firestore.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.page.html',
  styleUrls: ['./maps.page.scss'],
})
export class MapsPage implements OnInit {
  public map: Mapboxgl.Map;
  public start = [-70.70555523861034, -33.5988065509325];
  public style = 'mapbox://styles/mapbox/streets-v11';
  public cords : any;
  public name: any;
  public user : any;
  public arrayUber : any;
  public destino : string;
  public inicio : string;




  public listarCoords: any
  public listarName: any

  private apiurl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/';
  private url = '';
  private apiurl2 = 'https://api.mapbox.com/geocoding/v5/mapbox.places/';
  private url2 = '';


  constructor(
    private geolocation: Geolocation,
    private mapboxService : MapBoxService,
    private http: HttpClient,
    private fire: FirestoreService,
    private alertController: AlertController,
    private router : Router) {
    Mapboxgl.accessToken = environment.MAPBOX_KEY
  }

   addresses:string[] = [];
   selectedAddress = null;
   center : string;
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

    }
   }

   async viajeConfirmado() {
    const alert = await this.alertController.create({
      header: 'Alert',
      message: 'Viaje confirmado, espera a los pasajeros',
      buttons: ['OK'],
    });
    await alert.present();
  }

   onSelect(address : string){
    this.selectedAddress = address;
    this.addresses = [];
    this.destino = this.selectedAddress;

    this.url = this.apiurl + this.selectedAddress + '.json' + '?'  + 'access_token=' +environment.MAPBOX_KEY;

    this.http.get<Array<any>>(this.url).subscribe(data => {
      this.listarCoords = data;

      this.cords = this.listarCoords.features[0];

      this.crearMarcador3(this.cords.center[1], this.cords.center[0] )
      this.selectedAddress = "";
    })
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem("user"));

    this.map = new Mapboxgl.Map({
      container: 'mapa-box',
      style: this.style,
      zoom: 16,
      center: [
        -70.70555523861034, -33.5988065509325
      ]
        });
      }


  crearMarcador2(lng: number, lat: number){
    const marker = new Mapboxgl.Marker({
      draggable: false
      }).setLngLat([lat,lng])
      .addTo(this.map);
      marker.on("dragend",()=>
      console.log(marker.getLngLat()))
  }

  crearMarcador3(lng: number, lat: number){
    const marker = new Mapboxgl.Marker({
      draggable: true,
      color: 'green'
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

      this.url2 = this.apiurl2 + longitude + ',' + latitude+ '.json' + '?'  + 'access_token=' +environment.MAPBOX_KEY;

      this.http.get<Array<any>>(this.url2).subscribe(data => {
        this.listarName = data;
        this.name = this.listarName.features[0];
        this.inicio = this.name.place_name;
      })

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
  onClick(){

    this.arrayUber = this.user.uber[0];
    console.log(this.inicio)
    console.log(this.destino)

    const data = {
      estado: 'on',
      uber : [{
        precio : this.arrayUber.precio,
        salida: this.arrayUber.salida,
        modelo : this.arrayUber.modelo,
        destino: this.destino,
        patente: this.arrayUber.patente,
        inicio: this.inicio,
        capacidad: this.arrayUber.capacidad
      }]}

       const userStorage = {
        usuario : this.user.usuario,
        password:this.user.password,
        vehiculo: this.user.vehiculo,
        estado: 'on',
        id: this.arrayUber.id,
        uber: [{
          precio : this.arrayUber.precio,
          salida: this.arrayUber.salida,
          modelo : this.arrayUber.modelo,
          destino: this.destino,
          patente: this.arrayUber.patente,
          inicio: this.inicio,
          capacidad: this.arrayUber.capacidad
        }],
      }
      this.fire.updateDoc(data,'Usuarios', this.user.id.toString());
      localStorage.setItem("user", JSON.stringify(userStorage));
      this.viajeConfirmado();
      this.router.navigate(['index']).then(() => {
        window.location.reload();
      })


  }
  public volver(){
    this.router.navigate(['index'])

  }




}
