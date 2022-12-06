import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { UsuariosService } from './../../servicios/usuarios/usuarios.service';

import { RegistrarPageRoutingModule } from './registrar-routing.module';

import { RegistrarPage } from './registrar.page';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    RegistrarPageRoutingModule,
    HttpClientModule
  ],
  declarations: [RegistrarPage],
  providers: [ UsuariosService]
})
export class RegistrarPageModule {}
