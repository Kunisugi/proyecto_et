import { Component } from '@angular/core';
import { FormControl, FormBuilder, FormGroup} from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { FirestoreService} from './../../servicios/DB/firestore.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  public formulario : FormGroup;
  public listaUsuarios: Array<any> = [];
  public user : any;


  constructor(private fb : FormBuilder, private router: Router, private alertController: AlertController, private fire: FirestoreService ) { this.form()}

  ngOnInit() {
    this.fire.listarUserDB$.subscribe(datos => {
      this.listaUsuarios = datos;
      console.log(this.listaUsuarios, 'soy listar usuarios')
    })
    this.fire.getCollection();


  }
  async noExisteUsuario() {
    const alert = await this.alertController.create({
      header: 'Alert',
      message: 'El usuario no existe',
      buttons: ['OK'],
    });
    await alert.present();
  }

  async contraseñaErronea() {
    const alert = await this.alertController.create({
      header: 'Alert',
      message: 'contraseña incorrecta, vuelva a intentar',
      buttons: ['OK'],
    });
    await alert.present();
  }



  public form(){
    this.formulario = this.fb.group({
      user: new FormControl(''),
      password: new FormControl('')

    })

  }
  public login(){
    this.user = this.listaUsuarios.find(elemento => {
      const usuario = this.formulario.value.user
      return elemento.usuario === usuario
    })
    if(this.user){
      if(this.user.password === this.formulario.value.password){
        console.log('Validación correcta')
        if(this.user.vehiculo === 'si'){
          console.log('Tiene auto')
          this.router.navigate(['index'])
          localStorage.setItem("user", JSON.stringify(this.user));
        }else{
          localStorage.setItem("user", JSON.stringify(this.user));
          console.log('No tiene auto')
          this.router.navigate(['index']);
        }

      }else{
        this.contraseñaErronea();
      }

    }else{
      this.noExisteUsuario();
    }
  }



}
