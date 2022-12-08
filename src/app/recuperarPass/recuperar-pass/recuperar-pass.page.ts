import { Component, OnInit } from '@angular/core';
import { UsuariosService } from './../../servicios/usuarios/usuarios.service';
import { FormControl, FormBuilder, FormGroup, Validators} from '@angular/forms';

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
      password: new FormControl('',[Validators.required])

    })

  }



  public mostrarForm(){
    this.user = this.listaUsuarios.find(elemento => {
      const usuario = this.formulario.value.usuario
      return elemento.usuario === usuario
    });
    if(this.user){ //Si existe usuario
      if(this.estado == true){ //Si estado es verdadero
        if(this.user.password == this.formulario.value.password){//Si contraseña antigua es igual a la que se quiere cambiar
          alert('Contraseña es igual a la anterior...')


        }else{ //Si es diferente
          const nuevaContra =  this.formulario.value

          this.api.patchUser(nuevaContra , this.user.id).subscribe(data => {
            alert('Contraseña modificada correctmente')
        })

        }


      }else{//Si estado es falso
        console.log('cambio estado a true')
        this.estado = true;

      }
    }else{//Si no existe usuario
      alert('Usuario No encontrado')

    }

  }

}
