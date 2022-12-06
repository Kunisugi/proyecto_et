import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [{
  path: '',
  loadChildren: ()=> import ('./login/login/login.module').then(m => m.LoginPageModule)
},
  {
    path: 'registrar',
    loadChildren: () => import('./registrar/registrar/registrar.module').then( m => m.RegistrarPageModule)
  },
  {
    path: 'recuperar-pass',
    loadChildren: () => import('./recuperarPass/recuperar-pass/recuperar-pass.module').then( m => m.RecuperarPassPageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
