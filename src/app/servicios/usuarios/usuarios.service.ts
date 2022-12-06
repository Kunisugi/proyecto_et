import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private api_user = 'http://localhost:3000/user';
  private comportamientoListar = new BehaviorSubject<Array<any>>([]);
  public listarUser$ = this.comportamientoListar.asObservable();

  constructor(private http : HttpClient) { }

  public getPersona(){
    this.http.get<Array<any>>(this.api_user).subscribe(data => {
      this.comportamientoListar.next(data);
    })
  }

  public postUsuario(nuevoUser: any): Observable<any>{
    return this.http.post(this.api_user, nuevoUser,{
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    })
  }


}
