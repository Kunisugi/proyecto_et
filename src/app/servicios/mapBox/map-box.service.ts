import { Injectable } from '@angular/core';
import { DirectionsApiClient } from 'src/app/maps/api/directionsApiClient';
import { DirectionsResponse } from 'src/app/maps/interfaces/directions';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {map} from 'rxjs/operators';



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

  constructor( private directionsApi: DirectionsApiClient, private http: HttpClient) { }


  getRouteBetweenPoints(start:[number, number], end: [number, number]){
    this.directionsApi.get<DirectionsResponse>(`/${start.join(',')};${end.join(',')}`).subscribe(resp => console.log(resp));
  }

  search_word(query:string){
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/';
    return this.http.get(url+query+'.json?types=address&access_token='
    + environment.MAPBOX_KEY)
    .pipe(map((res: MapboxOutput)=>{
      return res.features;
    }));
  }



}
