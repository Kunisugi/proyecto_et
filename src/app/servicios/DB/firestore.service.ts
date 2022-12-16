import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  private comportamientoListar = new BehaviorSubject<Array<any>>([]);
  public listarUserDB$ = this.comportamientoListar.asObservable();

  public listar:Array<any>;

  constructor(private fire : AngularFirestore) { }

  crearDoc(){
    this.fire.collection('Usuarios')
  }
  getCollection(){
    this.fire.collection('Usuarios').valueChanges().subscribe((res) => {
      this.comportamientoListar.next(res);


      console.log(this.comportamientoListar.value, 'Soy listar en services')
    })

  }
}
