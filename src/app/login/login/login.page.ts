import { Component } from '@angular/core';
import { FormControl, FormBuilder, FormGroup} from '@angular/forms';
import { UsuariosService } from './../../servicios/usuarios/usuarios.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  public formulario : FormGroup;
  public listaUsuarios: Array<any> = [];
  public user : any;


  constructor(private fb : FormBuilder, private api: UsuariosService ) { this.form()}

  ngOnInit() {
    this.api.listarUser$.subscribe(datos => {
      this.listaUsuarios = datos;
    });
    this.api.getPersona();


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
        }else{
          console.log('No tiene auto')

        }

      }else{
        console.log('Contraseña incorrecta, vuelva a intentar')
      }

    }else{
      alert('no se encontro usuario')
    }


  }

}
