import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule } from '@ionic/angular';

import { LoginPageRoutingModule } from './login-routing.module';

import { LoginPage } from './login.page';
import { UsuariosService } from './../../servicios/usuarios/usuarios.service';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    LoginPageRoutingModule,
    HttpClientModule
  ],
  declarations: [LoginPage],
  providers: [UsuariosService ]
})
export class LoginPageModule {}
