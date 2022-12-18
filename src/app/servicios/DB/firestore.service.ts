import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { createBrotliDecompress } from 'zlib';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  private comportamientoListar = new BehaviorSubject<Array<any>>([]);
  public listarUserDB$ = this.comportamientoListar.asObservable();

  public listar:Array<any>;

  constructor(private fire : AngularFirestore) { }

  getCollection(){
    this.fire.collection('Usuarios').valueChanges().subscribe((res) => {
      this.comportamientoListar.next(res);
      console.log(this.comportamientoListar.value, 'Soy listar en services')
    })
  }

  newDoc(data: any, path: string, id : string ){
    const collection =  this.fire.collection(path);
    return collection.doc(id).set(data);
  }

  getDoc(path: string, id: string){
    const collection =  this.fire.collection(path);
    return collection.doc(id).valueChanges();
  }

  deleteDoc(path:string, id: string){
    const collection =  this.fire.collection(path);
    return collection.doc(id).delete();
  }

  updateDoc(data : any, path:string, id: string){
    const collection =  this.fire.collection(path);
    return collection.doc(id).update(data);
  }
}
