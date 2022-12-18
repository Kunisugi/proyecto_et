import { Component, OnInit } from '@angular/core';
import { FirestoreService} from './../../servicios/DB/firestore.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-listar-rutas',
  templateUrl: './listar-rutas.page.html',
  styleUrls: ['./listar-rutas.page.scss'],
})
export class ListarRutasPage implements OnInit {
  public rutas: Array<any> = [];
  public listarUser: Array<any> = [];

  constructor(private fire: FirestoreService, public router: Router, private activedRoute : ActivatedRoute ) { }

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
    );
    console.log(this.rutas, 'soy rutas')
  }

  public volver(){
    this.router.navigate(['index'])
  }

}
