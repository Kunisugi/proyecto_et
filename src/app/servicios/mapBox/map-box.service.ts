import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {map} from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';


export interface MapboxOutput{
  attribution : string;
  features : Feature[];
  query: [];
}
export interface Feature {
  place_name:string;
  center : []
}

@Injectable({
  providedIn: 'root'
})
export class MapBoxService {


  private ComportamientoCoords = new BehaviorSubject<Array<any>>([]);
  public listarCoords$ = this.ComportamientoCoords.asObservable();

  private ComportamientoName = new BehaviorSubject<Array<any>>([]);
  public listarName$ = this.ComportamientoCoords.asObservable();

  constructor(
    private http: HttpClient,
    ) { }


  search_word(query:string){
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/';
    return this.http.get(url+query+'.json?types=address&access_token='
    + environment.MAPBOX_KEY)
    .pipe(map((res: MapboxOutput)=>{
      return res.features;
    }));
  }


}
