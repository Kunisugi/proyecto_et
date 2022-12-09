import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators';
import { HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';

export interface MapBoxOutpu{
  attribution: string;
  features: Feature[];
  query: [];
}
export interface Feature{
  place_name: string;
}

@Injectable({
  providedIn: 'root'
})
export class MapBoxService {

  constructor(private htpp: HttpClient) { }



}
