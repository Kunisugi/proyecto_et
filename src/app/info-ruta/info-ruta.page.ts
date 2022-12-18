import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FirestoreService} from './../servicios/DB/firestore.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-info-ruta',
  templateUrl: './info-ruta.page.html',
  styleUrls: ['./info-ruta.page.scss'],
})
export class InfoRutaPage implements OnInit {
  public idConductor: number;
  public infoConductor: any;
  public infoRuta : any;

  constructor( private activedRoute : ActivatedRoute, private fire : FirestoreService, public router: Router, private alertController: AlertController) { }

  ngOnInit() {
    this.idConductor = this.activedRoute.snapshot.queryParams['id'];
    this.fire.getDoc('Usuarios', this.idConductor.toString()).subscribe(data => {
      this.infoConductor = data;
      this.infoRuta = this.infoConductor.uber[0];
      console.log(this.infoRuta)
      console.log(this.infoConductor)
    })
  }

  async rutaConfirmada() {
    const alert = await this.alertController.create({
      header: 'Alert',
      message: 'Ruta confirmada! ve al punto de encuentro',
      buttons: ['OK'],
    });
    await alert.present();
  }

  public volver(){
    this.router.navigate(['rutas'])

  }
  public confirmar(){
    const capacidad = this.infoRuta.capacidad - 1

    if(capacidad == 0){
      const data  = {
        estado : "off"
      }
      this.fire.updateDoc(data,'Usuarios', this.idConductor.toString());

    }else{
      const data2 = {
        uber : [{
          precio : this.infoRuta.precio,
          salida: this.infoRuta.salida,
          modelo : this.infoRuta.modelo,
          destino: this.infoRuta.destino,
          patente: this.infoRuta.patente,
          inicio: this.infoRuta.inicio,
          capacidad: capacidad
        }]};
        this.fire.updateDoc(data2,'Usuarios', this.idConductor.toString());
    }

    this.rutaConfirmada();
    this.router.navigate(['index']);

  }

}
