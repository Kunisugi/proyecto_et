import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import { FirestoreService} from './../../servicios/DB/firestore.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

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

  constructor(private fb : FormBuilder, private fire: FirestoreService, private router: Router, private alertController: AlertController) {this.form()}

  ngOnInit() {
    this.fire.listarUserDB$.subscribe(datos => {
      this.listaUsuarios = datos;
      console.log(this.listaUsuarios, 'soy listar usuarios en recuperar pass')
    })
    this.fire.getCollection();
  }

  public form(){
    this.formulario = this.fb.group({
      usuario: new FormControl(''),
      password: new FormControl('',[Validators.required])

    })
  }

  public mostrarForm(){
    this.user = this.listaUsuarios.find(elemento => {
      const usuario = this.formulario.value.usuario
      console.log(elemento, 'Soy elemento')
      return elemento.usuario === usuario

    });
    if(this.user){ //Si existe usuario
      if(this.estado == true){ //Si estado es verdadero
        if(this.user.password == this.formulario.value.password){//Si contraseña antigua es igual a la que se quiere cambiar
          this.contraseñaAnterior();
        }else{ //Si es diferente
          const nuevaContra =  this.formulario.value;
          const id = this.user.id;
          this.fire.updateDoc(nuevaContra,'Usuarios', id.toString());
          this.router.navigate(['']);
          this.cambioExitoso();
        }
      }else{//Si estado es falso
        console.log('cambio estado a true')
        this.estado = true;
      }
    }else{//Si no existe usuario
      this.noExisteUsuario()

    }

  }
  async contraseñaAnterior() {
    const alert = await this.alertController.create({
      header: 'Alert',
      message: 'La contraseña es igual a la anterior...',
      buttons: ['OK'],
    });
    await alert.present();
  }

  async noExisteUsuario() {
    const alert = await this.alertController.create({
      header: 'Alert',
      message: 'El usuario no existe',
      buttons: ['OK'],
    });
    await alert.present();
  }

  async cambioExitoso() {
    const alert = await this.alertController.create({
      header: 'Alert',
      message: 'Contraseña correctamente cambiada',
      buttons: ['OK'],
    });
    await alert.present();
  }






}
