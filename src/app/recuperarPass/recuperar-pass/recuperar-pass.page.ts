import { Component, OnInit } from '@angular/core';
import { UsuariosService } from './../../servicios/usuarios/usuarios.service';
import { FormControl, FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-recuperar-pass',
  templateUrl: './recuperar-pass.page.html',
  styleUrls: ['./recuperar-pass.page.scss'],
})
export class RecuperarPassPage implements OnInit {
  public formulario : FormGroup;
  public listaUsuarios: Array<any> = [];
  public user : any;
  public estado : boolean = false;

  constructor( private api : UsuariosService, private fb : FormBuilder) {this.form()}

  ngOnInit() {
    this.api.listarUser$.subscribe(datos => {
      this.listaUsuarios = datos;
    });
    this.api.getPersona();

  }

  public form(){
    this.formulario = this.fb.group({
      usuario: new FormControl(''),
      password: new FormControl('')

    })

  }

  public mostrarForm(){
    this.user = this.listaUsuarios.find(elemento => {
      const usuario = this.formulario.value.usuario
      return elemento.usuario === usuario
    });
    if(this.user){
      this.estado = true;

    }else{
      alert('Usuario No encontrado')

    }

  }

}
