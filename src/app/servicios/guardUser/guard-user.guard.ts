import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GuardUserGuard implements CanActivate {
  public user: any;
  constructor(private router : Router ){}

  siLoginUser():any{
    this.router.navigate(['index'])
}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      this.user = JSON.parse(localStorage.getItem('user'));
      if(this.user){
        this.siLoginUser();
        return false
      }else{
        return true;
      }



  }

}
