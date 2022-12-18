import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FirestoreService} from './../../servicios/DB/firestore.service';

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

  constructor(private fb : FormBuilder, private alertController: AlertController, private router: Router, private fire: FirestoreService) { this.form()}

  ngOnInit() {
    this.fire.listarUserDB$.subscribe(datos => {
      this.listaUsuarios = datos;
      console.log(this.listaUsuarios, 'Estoy en registrar')
      console.log(this.listaUsuarios.length)
    })
    this.fire.getCollection();



  }
  public form(){this.formulario = this.fb.group({
    usuario: new FormControl('',[Validators.required]),
    password: new FormControl('', [Validators.required]),
    vehiculo: new FormControl('', [Validators.required]),
    patente: new FormControl(''),
    modelo: new FormControl('')


  })};

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Alert',
      message: 'Excelente has sido registrado a la base de datos',
      buttons: ['OK'],
    });
    await alert.present();
  }

  async usuarioExiste() {
    const alert = await this.alertController.create({
      header: 'Alert',
      message: 'Usuario existe',
      buttons: ['OK'],
    });
    await alert.present();
  }

  public auto(){
    const data = {
      usuario: this.formulario.value.usuario,
      password: this.formulario.value.password,
      vehiculo: this.formulario.value.vehiculo,
      id: this.listaUsuarios.length + 1,
      estado: 'off',
      uber:[{
        salida: "",
        precio: 0,
        patente: this.formulario.value.patente,
        modelo: this.formulario.value.modelo,
        destino: "",
        inicio: ""
      }]
    };
    const path = 'Usuarios/';
    const id = this.listaUsuarios.length + 1;
    this.fire.newDoc(data, path, id.toString())
      this.presentAlert();
      this.router.navigate(['']);
  }


  public registrar(){
    this.user = this.listaUsuarios.find(elemento => {
      const usuario = this.formulario.value.usuario
      return elemento.usuario === usuario
    });

    if(this.user){
        this.usuarioExiste();
    }else{
      if(this.formulario.value.vehiculo === 'si'){
        this.estado = true;

        }
        else{
          const data = {
            usuario: this.formulario.value.usuario,
            password: this.formulario.value.password,
            vehiculo: this.formulario.value.vehiculo,
            id: this.listaUsuarios.length + 1,
            estado: 'off',
            uber:[{
              salida: "",
              precio: 0,
              patente: this.formulario.value.patente,
              modelo: this.formulario.value.modelo,
              destino: "",
              inicio: ""
            }]
          }
          const path = 'Usuarios/';
          const id = this.listaUsuarios.length + 1;
          this.fire.newDoc(data, path, id.toString())
            this.presentAlert();
            this.router.navigate([''])
        }
    }
  }





}
