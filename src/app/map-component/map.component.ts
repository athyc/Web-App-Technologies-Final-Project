import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import * as L from 'leaflet';
import {latLng, MapOptions, tileLayer, Map, Marker, icon} from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit, OnChanges {

    map: Map;
  mapOptions: MapOptions;
  zoom = 14
  marker: Marker;

  @Input() myLat: number;
  @Input() myLon: number;

  ngOnChanges(changes: SimpleChanges) {
    if (changes.myLat) {
      this.myLat = changes.myLat.currentValue
    }
    if (changes.myLon) {
      this.myLon = changes.myLon.currentValue
    }
    if (this.myLat > 0 && this.myLon > 0) {
      console.log(this.myLat)
      console.log(this.myLon)
      this.map.setView(new L.LatLng(this.myLat, this.myLon), this.zoom);
      this.marker.remove();
      this.addSampleMarker();
    }
  } 

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
      zoom: this.zoom,
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
    this.marker = new Marker([this.myLat, this.myLon])
      .setIcon(
        icon({
          iconSize: [25, 41],
          iconAnchor: [13, 41],
          iconUrl: 'assets/marker-icon.png'
        }));
    this.marker.addTo(this.map);
  }

}
