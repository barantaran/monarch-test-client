import { Component, ViewChild } from '@angular/core';
import {
  GoogleMapsModule,
  MapAdvancedMarker,
  MapInfoWindow,
} from '@angular/google-maps';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent {
  center: google.maps.LatLngLiteral = { lat: 55.751244, lng: 37.618423 };
  zoom = 12;
  markers: any[] = [];
  newMarker: any = null;
  selectedMarker: any = null;
  editVisible: boolean = false;
  newLabel: string = '';

  @ViewChild(MapInfoWindow) infoWindow!: MapInfoWindow;

  saveLabel() {}

  ngOnInit() {
    const parser = new DOMParser();
    const svgString = `<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#FF5733" stroke="#FFFFFF" viewBox="0 0 24 24">
                      <path fill-rule="evenodd" d="M11.293 3.293a1 1 0 0 1 1.414 0l6 6 2 2a1 1 0 0 1-1.414 1.414L19 12.414V19a2 2 0 0 1-2 2h-3a1 1 0 0 1-1-1v-3h-2v3a1 1 0 0 1-1 1H7a2 2 0 0 1-2-2v-6.586l-.293.293a1 1 0 0 1-1.414-1.414l2-2 6-6Z" clip-rule="evenodd"/>
                      </svg>`;
    this.markers.forEach((location) => {
      location.content = parser.parseFromString(
        svgString,
        'image/svg+xml'
      ).documentElement;
    });
  }

  onMarkerClick(marker: MapAdvancedMarker) {
    this.infoWindow.openAdvancedMarkerElement(
      marker.advancedMarker,
      marker.advancedMarker.title
    );
  }

  addMarker(event: google.maps.MapMouseEvent) {
    if (event.latLng) {
      this.markers.push({
        position: event.latLng.toJSON(),
        options: {},
      });
    }

    setTimeout(() => {
      this.editVisible = true;
    }, 500);
  }

  removeMarker(marker: any) {
    this.markers = this.markers.filter((m) => m !== marker);
  }

  openEditDialog(marker: any) {
    this.selectedMarker = marker;
    this.newLabel = marker.label;
    this.editVisible = true;
  }

  closeDialog() {
    this.editVisible = false;
  }
}
