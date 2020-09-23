import {Component, Input, OnInit} from '@angular/core';
import {latLng, MapOptions, tileLayer, Map, Marker, icon} from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

    map: Map;
  mapOptions: MapOptions;

  @Input() myLat: number;
  @Input() myLon: number;

  // myLat = 38.007152;
  // myLon = 23.824937;

  constructor() {
  }

  ngOnInit() {
    this.initializeMapOptions();
  }

  onMapReady(map: Map) {
    this.map = map;
    this.addSampleMarker();
  }

  private initializeMapOptions() {
    this.mapOptions = {
      center: latLng(this.myLat, this.myLon),
      zoom: 14,
      layers: [
        tileLayer(
          'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          {
            maxZoom: 18,
            attribution: 'Map data © OpenStreetMap'
          })
      ],
    };
  }

  private addSampleMarker() {
    const marker = new Marker([this.myLat, this.myLon])
      .setIcon(
        icon({
          iconSize: [25, 41],
          iconAnchor: [13, 41],
          iconUrl: 'assets/marker-icon.png'
        }));
    marker.addTo(this.map);
  }

}
