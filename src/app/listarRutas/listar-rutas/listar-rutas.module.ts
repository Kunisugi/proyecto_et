import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListarRutasPageRoutingModule } from './listar-rutas-routing.module';

import { ListarRutasPage } from './listar-rutas.page';
import { UsuariosService } from './../../servicios/usuarios/usuarios.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListarRutasPageRoutingModule,
    HttpClientModule
  ],
  declarations: [ListarRutasPage],
  providers: [UsuariosService]
})
export class ListarRutasPageModule {}
