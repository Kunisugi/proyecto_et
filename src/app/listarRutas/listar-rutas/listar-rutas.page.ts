import { Component, OnInit } from '@angular/core';
import { UsuariosService} from './../../servicios/usuarios/usuarios.service';

@Component({
  selector: 'app-listar-rutas',
  templateUrl: './listar-rutas.page.html',
  styleUrls: ['./listar-rutas.page.scss'],
})
export class ListarRutasPage implements OnInit {
  public rutas: Array<any> = [];
  public listarUser: Array<any> = [];

  constructor(private api : UsuariosService ) { }

  ngOnInit() {
    this.api.listarUser$.subscribe(data => {
      this.listarUser = data;
    })
    this.api.getPersona();

  }
  ngDoCheck(){
    this.rutas = this.listarUser.filter(elemento =>
      elemento.estado === "on"
    );
    console.log(this.rutas, 'soy rutas')

  }

}
