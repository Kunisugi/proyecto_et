import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import { FirestoreService} from '../servicios/DB/firestore.service';
import { Usuario} from './../interfaces/usuario';


@Component({
  selector: 'app-index',
  templateUrl: './index.page.html',
  styleUrls: ['./index.page.scss'],
})
export class IndexPage implements OnInit {
  public usuarioLinea: Usuario;
  public estado : boolean = false;
  public formulario: FormGroup;
  public arrayUber : any;
  public user : any;

  constructor(private router: Router, private fb : FormBuilder, private fire: FirestoreService) {this.form() }

  ngOnInit() {
    this.usuarioLinea = JSON.parse(localStorage.getItem("user"));
  }
  public form(){this.formulario = this.fb.group({
    precio: new FormControl('',[Validators.required]),
    salida: new FormControl('', [Validators.required]),
    capacidad: new FormControl ('', [Validators.required]),
  })};

  public logout(){
    localStorage.clear();
    this.router.navigate(['']).then(() => {
      window.location.reload();
    })
  }
  navegarRutas(){
    this.router.navigate(['rutas']);
  }
  mostrarForm(){
    this.estado = true;
  }
  data(){

     this.arrayUber = this.usuarioLinea.uber[0];
    const data = {
      estado: 'off',
      uber : [{
        precio : this.formulario.value.precio,
        salida: this.formulario.value.salida,
        modelo : this.arrayUber.modelo,
        destino: "",
        patente: this.arrayUber.patente,
        inicio: "",
        capacidad: this.formulario.value.capacidad
      }]}

    this.user = {
      usuario : this.usuarioLinea.usuario,
      password: this.usuarioLinea.password,
      vehiculo: this.usuarioLinea.vehiculo,
      estado: this.usuarioLinea.estado,
      id: this.usuarioLinea.id,
      uber: [{
        precio : this.formulario.value.precio,
        salida: this.formulario.value.salida,
        modelo : this.arrayUber.modelo,
        destino: "",
        patente: this.arrayUber.patente,
        inicio: "",
        capacidad: this.formulario.value.capacidad
      }],
    }
    this.fire.updateDoc(data,'Usuarios', this.usuarioLinea.id.toString());
    localStorage.setItem("user", JSON.stringify(this.user));
    this.router.navigate(['index/maps'])

  }

}
