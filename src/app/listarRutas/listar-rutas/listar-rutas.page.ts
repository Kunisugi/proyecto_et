import { Component, OnInit } from '@angular/core';
import { FirestoreService} from './../../servicios/DB/firestore.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-listar-rutas',
  templateUrl: './listar-rutas.page.html',
  styleUrls: ['./listar-rutas.page.scss'],
})
export class ListarRutasPage implements OnInit {
  public rutas: Array<any> = [];
  public listarUser: Array<any> = [];
  public length: number;

  constructor(private fire: FirestoreService, public router: Router, private activedRoute : ActivatedRoute, private alertController: AlertController ) { }

  ngOnInit() {
    this.fire.listarUserDB$.subscribe(datos => {
      this.listarUser = datos;
      console.log(this.listarUser, 'soy listar usuarios en listar rutas')
    })
    this.fire.getCollection();
  }

  ngDoCheck(){
    this.rutas = this.listarUser.filter(elemento =>
      elemento.estado === "on"
    )
  }

  async sinRutas() {
    const alert = await this.alertController.create({
      header: 'Alert',
      message: 'Lo sentimos, por el momento no hay rutas disponibles',
      buttons: ['OK'],
    });
    await alert.present();
  }

  public volver(){
    this.router.navigate(['index'])
  }

}
