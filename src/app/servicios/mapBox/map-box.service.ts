import { Injectable } from '@angular/core';
import { DirectionsApiClient } from 'src/app/maps/api/directionsApiClient';
import { DirectionsResponse } from 'src/app/maps/interfaces/directions';

@Injectable({
  providedIn: 'root'
})
export class MapBoxService {

  constructor( private directionsApi: DirectionsApiClient) { }


  getRouteBetweenPoints(start:[number, number], end: [number, number]){
    this.directionsApi.get<DirectionsResponse>(`/${start.join(',')};${end.join(',')}`).subscribe(resp => console.log(resp));
  }

}
