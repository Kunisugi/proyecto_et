import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import { UsuariosService } from './../../servicios/usuarios/usuarios.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.page.html',
  styleUrls: ['./registrar.page.scss'],
})
export class RegistrarPage implements OnInit {
  public listaUsuarios: Array<any> = [];
  public formulario: FormGroup;
  public user: any;
  public estado: boolean = false;

  constructor(private fb : FormBuilder, private api : UsuariosService, private alertController: AlertController) { this.form()}

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
      if(this.formulario.value.vehiculo === 'si'){
          this.api.postUsuario({
            ...this.formulario.value,
            estado: 'off',
            uber:[{
              salida: "",
              precio: 0,
              patente: "",
              modelo: "",
              destino: "",}]
          }).subscribe(data => {})
        }
        else{
          this.api.postUsuario({
            ...this.formulario.value}).subscribe(data => {

          })


        }

    }


  }




}
