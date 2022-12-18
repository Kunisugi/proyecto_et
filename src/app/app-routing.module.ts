import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { GuardUserGuard} from './servicios/guardUser/guard-user.guard';

const routes: Routes = [{
  path: '',
  loadChildren: ()=> import ('./login/login/login.module').then(m => m.LoginPageModule),
  canActivate: [GuardUserGuard]
},
  {
    path: 'registrar',
    loadChildren: () => import('./registrar/registrar/registrar.module').then( m => m.RegistrarPageModule),
    canActivate: [GuardUserGuard]
  },
  {
    path: 'recuperar',
    loadChildren: () => import('./recuperarPass/recuperar-pass/recuperar-pass.module').then( m => m.RecuperarPassPageModule),
    canActivate: [GuardUserGuard]
  },
  {
    path: 'rutas',
    loadChildren: () => import('./listarRutas/listar-rutas/listar-rutas.module').then( m => m.ListarRutasPageModule)
  },
  {
    path: 'index/maps',
    loadChildren: () => import('./maps/maps.module').then( m => m.MapsPageModule)
  },
  {
    path: 'index',
    loadChildren: () => import('./index/index.module').then( m => m.IndexPageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
