import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import { UsuariosService } from './../../servicios/usuarios/usuarios.service';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.page.html',
  styleUrls: ['./registrar.page.scss'],
})
export class RegistrarPage implements OnInit {
  public listaUsuarios: Array<any> = [];
  public formulario: FormGroup;
  public user: any;

  constructor(private fb : FormBuilder, private api : UsuariosService) { this.form()}

  ngOnInit() {
    this.api.listarUser$.subscribe(datos => {
      this.listaUsuarios = datos;
      //console.log(this.listaUsuarios)
    })
    this.api.getPersona();
  }
  public form(){this.formulario = this.fb.group({
    usuario: new FormControl('',[Validators.required]),
    password: new FormControl('', [Validators.required]),
    vehiculo: new FormControl('', [Validators.required])

  })}

  public registrar(){
    this.user = this.listaUsuarios.find(elemento => {
      const usuario = this.formulario.value.usuario
      return elemento.user === usuario
    });

    if(this.user){
      alert('Existe usuario')
    }else{
      this.api.postUsuario({
        ...this.formulario.value
      }).subscribe(data => {
        alert('Registrado correctamente')
      })
    }


  }

}
