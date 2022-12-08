import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListarRutasPage } from './listar-rutas.page';

const routes: Routes = [
  {
    path: '',
    component: ListarRutasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListarRutasPageRoutingModule {}
