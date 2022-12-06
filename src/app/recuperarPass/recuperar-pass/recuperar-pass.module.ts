import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';

import { RecuperarPassPageRoutingModule } from './recuperar-pass-routing.module';

import { RecuperarPassPage } from './recuperar-pass.page';
import { UsuariosService } from './../../servicios/usuarios/usuarios.service';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    RecuperarPassPageRoutingModule,
    HttpClientModule
  ],
  declarations: [RecuperarPassPage],
  providers: [UsuariosService]
})
export class RecuperarPassPageModule {}
